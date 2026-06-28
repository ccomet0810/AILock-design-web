import { useEffect, useState } from "react";
import { FoundationsPage } from "./pages/FoundationsPage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ScreensPage } from "./pages/ScreensPage";
import { ColorLabPanel } from "./site/ColorLabPanel";
import {
  applyColorLabOverrides,
  createColorLabValues,
  type ColorLabTargetName,
  type ColorLabValues,
} from "./design/colorLab";

type PageKey = "foundations" | "components" | "screens";
type FontPlatform = "ios" | "android";

const pages: Array<{ id: PageKey; label: string }> = [
  { id: "foundations", label: "Foundations" },
  { id: "components", label: "Components" },
  { id: "screens", label: "Screens" },
];

function pageFromHash(): PageKey {
  const hash = window.location.hash.replace("#", "");
  return pages.some((item) => item.id === hash) ? (hash as PageKey) : "foundations";
}

function fontPlatformFromStorage(): FontPlatform {
  try {
    return window.localStorage.getItem("ailock-font-platform") === "android" ? "android" : "ios";
  } catch {
    return "ios";
  }
}

export default function App() {
  const [page, setPage] = useState<PageKey>(pageFromHash);
  const [fontPlatform, setFontPlatform] = useState<FontPlatform>(fontPlatformFromStorage);
  const [colorValues, setColorValues] = useState<ColorLabValues>(createColorLabValues);
  const [activeColorTargetName, setActiveColorTargetName] = useState<ColorLabTargetName>("BrandOrange");

  useEffect(() => {
    applyColorLabOverrides(colorValues);
  }, [colorValues]);

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.fontPlatform = fontPlatform;
    window.localStorage.setItem("ailock-font-platform", fontPlatform);
  }, [fontPlatform]);

  const selectPage = (nextPage: PageKey) => {
    setPage(nextPage);
    window.location.hash = nextPage;
  };

  return (
    <div className="app-shell" data-font-platform={fontPlatform}>
      <aside className="side-nav">
        <div className="brand-lockup">
          <div className="brand-mark">A</div>
          <div>
            <strong>AILock</strong>
            <span>Design Lab</span>
          </div>
        </div>
        <nav aria-label="Design lab pages">
          {pages.map((item) => (
            <button
              key={item.id}
              className={item.id === page ? "nav-tab active" : "nav-tab"}
              onClick={() => selectPage(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="platform-dock">
          <div className="font-platform-toggle" aria-label="Preview platform" role="group">
            <button
              aria-pressed={fontPlatform === "ios"}
              className={fontPlatform === "ios" ? "active" : undefined}
              onClick={() => setFontPlatform("ios")}
              type="button"
            >
              iOS
            </button>
            <button
              aria-pressed={fontPlatform === "android"}
              className={fontPlatform === "android" ? "active" : undefined}
              onClick={() => setFontPlatform("android")}
              type="button"
            >
              Android
            </button>
          </div>
        </div>
      </aside>

      <main className="workspace">
        <div className="mobile-tabs" role="tablist" aria-label="Design lab pages">
          {pages.map((item) => (
            <button
              key={item.id}
              className={item.id === page ? "mobile-tab active" : "mobile-tab"}
              onClick={() => selectPage(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        {page === "foundations" && (
          <FoundationsPage
            activeColorTargetName={activeColorTargetName}
            colorValues={colorValues}
            onSelectColorTarget={setActiveColorTargetName}
          />
        )}
        {page === "components" && <ComponentsPage />}
        {page === "screens" && <ScreensPage />}
      </main>

      <ColorLabPanel
        activeTargetName={activeColorTargetName}
        colorValues={colorValues}
        setActiveTargetName={setActiveColorTargetName}
        setColorValues={setColorValues}
      />
    </div>
  );
}
