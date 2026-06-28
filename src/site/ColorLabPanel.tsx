import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { DesignIcon } from "../design/icons";
import {
  applyColorLabOverrides,
  applyColorLabValue,
  colorLabTargets,
  contrastRatio,
  getColorLabTarget,
  normalizeHexColor,
  overridesFromValues,
  saveColorLabOverrides,
  type ColorLabTargetName,
  type ColorLabValues,
} from "../design/colorLab";

const COLOR_LAB_OPEN_KEY = "ailock-site-color-lab-open";
const COMMIT_DELAY_MS = 180;

function initialOpenState() {
  try {
    return window.localStorage.getItem(COLOR_LAB_OPEN_KEY) === "true";
  } catch {
    return false;
  }
}

export function ColorLabPanel({
  activeTargetName,
  colorValues,
  setActiveTargetName,
  setColorValues,
}: {
  activeTargetName: ColorLabTargetName;
  colorValues: ColorLabValues;
  setActiveTargetName: Dispatch<SetStateAction<ColorLabTargetName>>;
  setColorValues: Dispatch<SetStateAction<ColorLabValues>>;
}) {
  const [isOpen, setIsOpen] = useState(initialOpenState);
  const [liveValues, setLiveValues] = useState(colorValues);
  const [hexInput, setHexInput] = useState(colorValues[activeTargetName]);
  const liveValuesRef = useRef(liveValues);
  const activeTargetNameRef = useRef(activeTargetName);
  const commitTimerRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const pendingCssRef = useRef<Partial<ColorLabValues>>({});

  const activeTarget = useMemo(() => getColorLabTarget(activeTargetName), [activeTargetName]);
  const activeValue = liveValues[activeTargetName];
  const isHexInputValid = normalizeHexColor(hexInput) !== null;
  const selectedWhiteTextContrast = useMemo(() => contrastRatio("#FFFFFF", activeValue), [activeValue]);
  const mainButtonWhiteTextContrast = useMemo(() => contrastRatio("#FFFFFF", liveValues.BrandOrange), [liveValues.BrandOrange]);

  useEffect(() => {
    liveValuesRef.current = colorValues;
    setLiveValues(colorValues);
    setHexInput(colorValues[activeTargetNameRef.current]);
  }, [colorValues]);

  useEffect(() => {
    activeTargetNameRef.current = activeTargetName;
    setHexInput(liveValuesRef.current[activeTargetName]);
  }, [activeTargetName]);

  useEffect(() => {
    try {
      window.localStorage.setItem(COLOR_LAB_OPEN_KEY, String(isOpen));
    } catch {
      // The panel still works for the current session when storage is unavailable.
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (commitTimerRef.current !== null) window.clearTimeout(commitTimerRef.current);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const flushCssVariables = () => {
    frameRef.current = null;
    const pending = pendingCssRef.current;
    pendingCssRef.current = {};

    colorLabTargets.forEach((target) => {
      const value = pending[target.name];
      if (value) applyColorLabValue(target.name, value);
    });
  };

  const scheduleCssVariable = (name: ColorLabTargetName, value: string) => {
    pendingCssRef.current[name] = value;
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(flushCssVariables);
  };

  const commitValues = (values: ColorLabValues, delay = COMMIT_DELAY_MS) => {
    if (commitTimerRef.current !== null) window.clearTimeout(commitTimerRef.current);

    commitTimerRef.current = window.setTimeout(() => {
      commitTimerRef.current = null;
      setColorValues(values);
      saveColorLabOverrides(overridesFromValues(values));
    }, delay);
  };

  const commitValuesNow = (values = liveValuesRef.current) => {
    if (commitTimerRef.current !== null) {
      window.clearTimeout(commitTimerRef.current);
      commitTimerRef.current = null;
    }

    setColorValues(values);
    saveColorLabOverrides(overridesFromValues(values));
  };

  const selectTarget = (name: ColorLabTargetName) => {
    setActiveTargetName(name);
    setHexInput(liveValuesRef.current[name]);
  };

  const setTargetColor = (name: ColorLabTargetName, rawValue: string, commitDelay = COMMIT_DELAY_MS) => {
    if (name === activeTargetName) setHexInput(rawValue);

    const normalized = normalizeHexColor(rawValue);
    if (!normalized) return;

    const nextValues = { ...liveValuesRef.current, [name]: normalized };
    liveValuesRef.current = nextValues;
    setLiveValues(nextValues);
    if (name === activeTargetName) setHexInput(normalized);

    scheduleCssVariable(name, normalized);
    commitValues(nextValues, commitDelay);
  };

  const resetTarget = () => {
    if (!activeTarget) return;
    const nextValues = { ...liveValuesRef.current, [activeTarget.name]: activeTarget.initialValue };
    liveValuesRef.current = nextValues;
    setLiveValues(nextValues);
    setHexInput(activeTarget.initialValue);
    applyColorLabValue(activeTarget.name, activeTarget.initialValue);
    commitValuesNow(nextValues);
  };

  const resetAllTargets = () => {
    const nextValues = colorLabTargets.reduce((values, target) => {
      values[target.name] = target.initialValue;
      return values;
    }, {} as ColorLabValues);

    liveValuesRef.current = nextValues;
    setLiveValues(nextValues);
    setHexInput(nextValues[activeTargetName]);
    applyColorLabOverrides(nextValues);
    commitValuesNow(nextValues);
  };

  const useActiveColorForMainButton = () => {
    const nextValues = { ...liveValuesRef.current, BrandOrange: liveValuesRef.current[activeTargetName] };
    liveValuesRef.current = nextValues;
    setLiveValues(nextValues);
    applyColorLabValue("BrandOrange", nextValues.BrandOrange);
    commitValuesNow(nextValues);
  };

  if (!activeTarget) return null;

  return (
    <div className={isOpen ? "site-color-lab open" : "site-color-lab"}>
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close color controls" : "Open color controls"}
        className="site-color-trigger"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span style={{ backgroundColor: activeValue }} />
        <DesignIcon name="settings" size={19} />
      </button>

      {isOpen ? (
        <section aria-label="Color controls" className="site-color-popover">
          <div className="site-color-header">
            <div>
              <span>{activeTarget.role}</span>
              <strong>{activeTarget.name}</strong>
            </div>
            <button aria-label="Close color controls" className="site-color-close" onClick={() => setIsOpen(false)} type="button">
              <DesignIcon name="close" size={18} />
            </button>
          </div>

          <div className="site-color-token-strip" role="group" aria-label="Color tokens">
            {colorLabTargets.map((target) => (
              <button
                className={target.name === activeTarget.name ? "site-color-token active" : "site-color-token"}
                key={target.name}
                onClick={() => selectTarget(target.name)}
                type="button"
              >
                <span style={{ backgroundColor: liveValues[target.name] }} />
                {target.name}
              </button>
            ))}
          </div>

          <div className="site-color-edit-row">
            <label className="site-color-picker">
              <span style={{ backgroundColor: activeValue }} />
              <input
                aria-label={`${activeTarget.name} color`}
                onBlur={() => commitValuesNow()}
                onChange={(event) => setTargetColor(activeTarget.name, event.currentTarget.value)}
                type="color"
                value={activeValue}
              />
            </label>

            <label className={isHexInputValid ? "site-color-hex" : "site-color-hex invalid"}>
              <span>Hex</span>
              <input
                aria-invalid={!isHexInputValid}
                aria-label="Hex"
                onBlur={() => commitValuesNow()}
                onChange={(event) => setTargetColor(activeTarget.name, event.currentTarget.value)}
                value={hexInput}
              />
            </label>
          </div>

          <div className="site-color-contrast">
            <span>
              <small>Selected / white</small>
              <strong>{selectedWhiteTextContrast}:1</strong>
            </span>
            <span>
              <small>Main / white</small>
              <strong>{mainButtonWhiteTextContrast}:1</strong>
            </span>
          </div>

          <div className="site-color-actions">
            <button onClick={useActiveColorForMainButton} type="button">
              Use as main
            </button>
            <button onClick={resetTarget} type="button">
              Reset token
            </button>
            <button onClick={resetAllTargets} type="button">
              Reset all
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
