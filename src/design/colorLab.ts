import { colors } from "./tokens";

export const COLOR_LAB_STORAGE_KEY = "ailock-color-lab-overrides";

export const colorLabTargets = [
  {
    name: "BrandOrange",
    cssVar: "--brand-orange",
    initialValue: colors.brandOrange,
    role: "Main button",
  },
  {
    name: "BrandOrangeHot",
    cssVar: "--brand-orange-hot",
    initialValue: colors.brandOrangeHot,
    role: "Highlight",
  },
  {
    name: "BrandOrangeDark",
    cssVar: "--brand-orange-dark",
    initialValue: colors.brandOrangeDark,
    role: "Pressed",
  },
  {
    name: "AppSurfacePressed",
    cssVar: "--app-surface-pressed",
    initialValue: colors.appSurfacePressed,
    role: "Pressed fill",
  },
  {
    name: "BrandCream",
    cssVar: "--brand-cream",
    initialValue: colors.brandCream,
    role: "Tint",
  },
  {
    name: "BrandBrown",
    cssVar: "--brand-brown",
    initialValue: colors.brandBrown,
    role: "Ink",
  },
  {
    name: "LeafGreen",
    cssVar: "--leaf-green",
    initialValue: colors.leafGreen,
    role: "Support",
  },
  {
    name: "SoftRed",
    cssVar: "--soft-red",
    initialValue: colors.softRed,
    role: "Error",
  },
  {
    name: "SoftRedContainer",
    cssVar: "--soft-red-container",
    initialValue: colors.softRedContainer,
    role: "Error tint",
  },
  {
    name: "SoftGreenContainer",
    cssVar: "--soft-green-container",
    initialValue: colors.softGreenContainer,
    role: "Success tint",
  },
] as const;

export type ColorLabTarget = (typeof colorLabTargets)[number];
export type ColorLabTargetName = ColorLabTarget["name"];
export type ColorLabOverrides = Partial<Record<ColorLabTargetName, string>>;
export type ColorLabValues = Record<ColorLabTargetName, string>;

const targetMap = new Map<string, ColorLabTarget>(colorLabTargets.map((target) => [target.name, target]));
const shortHexPattern = /^#[0-9a-f]{3}$/i;
const hexPattern = /^#[0-9a-f]{6}$/i;
const legacyDefaultOverrides: Partial<Record<ColorLabTargetName, readonly string[]>> = {
  BrandOrange: ["#C84A00", "#FF8A1F"],
};

export function getColorLabTarget(name: string): ColorLabTarget | undefined {
  return targetMap.get(name);
}

export function normalizeHexColor(input: string): string | null {
  const value = input.trim();
  const prefixed = value.startsWith("#") ? value : `#${value}`;

  if (shortHexPattern.test(prefixed)) {
    const [, r, g, b] = prefixed;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  return hexPattern.test(prefixed) ? prefixed.toUpperCase() : null;
}

function isOverrideMap(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function loadColorLabOverrides(): ColorLabOverrides {
  try {
    const raw = window.localStorage.getItem(COLOR_LAB_STORAGE_KEY);
    if (!raw) return {};

    const parsed: unknown = JSON.parse(raw);
    if (!isOverrideMap(parsed)) return {};

    const overrides: ColorLabOverrides = {};
    colorLabTargets.forEach((target) => {
      const value = parsed[target.name];
      if (typeof value !== "string") return;

      const normalized = normalizeHexColor(value);
      if (!normalized) return;
      if (legacyDefaultOverrides[target.name]?.includes(normalized)) return;

      overrides[target.name] = normalized;
    });

    return overrides;
  } catch {
    return {};
  }
}

export function createColorLabValues(): ColorLabValues {
  const overrides = loadColorLabOverrides();

  return colorLabTargets.reduce((values, target) => {
    values[target.name] = overrides[target.name] ?? target.initialValue;
    return values;
  }, {} as ColorLabValues);
}

export function overridesFromValues(values: ColorLabValues): ColorLabOverrides {
  return colorLabTargets.reduce((overrides, target) => {
    if (values[target.name] !== target.initialValue) {
      overrides[target.name] = values[target.name];
    }
    return overrides;
  }, {} as ColorLabOverrides);
}

export function saveColorLabOverrides(overrides: ColorLabOverrides) {
  try {
    window.localStorage.setItem(COLOR_LAB_STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // The lab still works for the current session when storage is unavailable.
  }
}

function valuesFromOverrides(overrides: ColorLabOverrides): ColorLabValues {
  return colorLabTargets.reduce((values, target) => {
    values[target.name] = overrides[target.name] ?? target.initialValue;
    return values;
  }, {} as ColorLabValues);
}

export function applyColorLabOverrides(overrides: ColorLabOverrides) {
  if (typeof document === "undefined") return;

  const values = valuesFromOverrides(overrides);
  colorLabTargets.forEach((target) => {
    setColorLabCssValue(target, values[target.name]);
  });
}

export function applyColorLabValue(name: ColorLabTargetName, value: string) {
  if (typeof document === "undefined") return;

  const target = getColorLabTarget(name);
  if (!target) return;

  setColorLabCssValue(target, value);
}

function setColorLabCssValue(target: ColorLabTarget, value: string) {
  document.documentElement.style.setProperty(target.cssVar, value);

  const rgb = hexToRgb(value);
  if (rgb) {
    document.documentElement.style.setProperty(`${target.cssVar}-rgb`, `${rgb.r} ${rgb.g} ${rgb.b}`);
  }
}

function hexToRgb(hex: string) {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return null;

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  };
}

function luminance(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const channel = (value: number) => {
    const scaled = value / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

export function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}
