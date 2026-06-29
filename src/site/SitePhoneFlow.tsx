import {
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type PointerEvent,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  AilockButton,
  PhoneFrame,
  ReasonComposer,
} from "../components/ailock";
import { sitePhoneApps, sitePhoneReasonScenarios, type SitePhoneApp, type SitePhoneAppId } from "./siteData";

export type SiteAilockRoute = "home" | "records" | "restrictions" | "settings";

type SitePhoneSurface = "phoneHome" | "ailock" | "externalApp" | "lockPrompt";

export type SiteAilockRenderProps = {
  onboarded: boolean;
  restartOnboarding: () => void;
  route: SiteAilockRoute;
  routeOverlayOpen: boolean;
  setOnboarded: Dispatch<SetStateAction<boolean>>;
  setRoute: Dispatch<SetStateAction<SiteAilockRoute>>;
  setRouteOverlayOpen: Dispatch<SetStateAction<boolean>>;
};

function SiteAppIcon({ app }: { app: Pick<SitePhoneApp, "color" | "letter"> }) {
  return (
    <span className="app-icon" style={{ "--app-icon-color": app.color } as CSSProperties}>
      <span>{app.letter}</span>
    </span>
  );
}

function SitePhoneHomeMock({
  activeAppId,
  onOpenApp,
}: {
  activeAppId?: SitePhoneAppId | null;
  onOpenApp: (app: SitePhoneApp) => void;
}) {
  return (
    <main className="site-phone-home">
      <div className="site-phone-home-grid" aria-label={"휴대폰 앱"}>
        {sitePhoneApps.map((app) => (
          <button
            aria-label={`${app.name} 열기`}
            className={`site-phone-home-app ${activeAppId === app.id ? "active" : ""} ${app.locked ? "locked" : ""}`}
            key={app.id}
            onClick={() => onOpenApp(app)}
            type="button"
          >
            <SiteAppIcon app={app} />
            <span>{app.name}</span>
          </button>
        ))}
      </div>
    </main>
  );
}

function SiteExternalAppMock({
  accessMinutes,
  app,
  onReturnHome,
}: {
  accessMinutes?: number | null;
  app: SitePhoneApp;
  onReturnHome: () => void;
}) {
  return (
    <div className="site-external-app">
      <div className="site-external-app-bar">
        <SiteAppIcon app={app} />
        <span>
          <strong>{app.name}</strong>
          <small>{accessMinutes ? `${accessMinutes}분 사용 가능` : "제한 없음"}</small>
        </span>
      </div>
      <div className="site-external-app-body" />
      <div className="app-bottom-action">
        <AilockButton onClick={onReturnHome} variant="secondary">
          {"휴대폰 홈"}
        </AilockButton>
      </div>
    </div>
  );
}

function SitePhoneGestureLayer({
  children,
  onBack,
  onHome,
}: {
  children: ReactNode;
  onBack: () => void;
  onHome: () => void;
}) {
  const homeStartYRef = useRef<number | null>(null);
  const backStartRef = useRef<{ x: number; y: number } | null>(null);

  const finishHomeGesture = (event: PointerEvent<HTMLButtonElement>) => {
    if (homeStartYRef.current === null) return;
    if (homeStartYRef.current - event.clientY > 18) onHome();
    homeStartYRef.current = null;
  };

  const finishBackGesture = (event: PointerEvent<HTMLButtonElement>) => {
    const start = backStartRef.current;
    if (!start) return;
    const movedX = event.clientX - start.x;
    const movedY = Math.abs(event.clientY - start.y);
    if (movedX > 42 && movedY < 96) onBack();
    backStartRef.current = null;
  };

  return (
    <div className="site-phone-gesture-shell">
      {children}
      <button
        aria-label={"뒤로가기"}
        className="site-phone-back-zone"
        onClick={onBack}
        onPointerCancel={() => {
          backStartRef.current = null;
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          backStartRef.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={finishBackGesture}
        title={"뒤로가기"}
        type="button"
      >
        <span />
      </button>
      <button
        aria-label={"홈으로"}
        className="site-phone-home-indicator"
        onClick={onHome}
        onPointerCancel={() => {
          homeStartYRef.current = null;
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          homeStartYRef.current = event.clientY;
        }}
        onPointerUp={finishHomeGesture}
        title={"홈으로"}
        type="button"
      >
        <span />
      </button>
    </div>
  );
}

export function SitePhoneFlow({
  renderAilockApp,
}: {
  renderAilockApp: (props: SiteAilockRenderProps) => ReactNode;
}) {
  const [surface, setSurface] = useState<SitePhoneSurface>("phoneHome");
  const [activeAppId, setActiveAppId] = useState<SitePhoneAppId | null>(null);
  const [onboarded, setOnboarded] = useState(false);
  const [route, setRoute] = useState<SiteAilockRoute>("home");
  const [routeOverlayOpen, setRouteOverlayOpen] = useState(false);
  const [reasonSession, setReasonSession] = useState(0);
  const [approvedUseMinutes, setApprovedUseMinutes] = useState<number | null>(null);
  const activeApp = activeAppId ? sitePhoneApps.find((app) => app.id === activeAppId) ?? null : null;

  const openApp = (app: SitePhoneApp) => {
    setActiveAppId(app.id);
    setApprovedUseMinutes(null);
    setRouteOverlayOpen(false);

    if (app.id === "ailock") {
      setSurface("ailock");
      return;
    }

    if (app.locked) {
      setReasonSession((value) => value + 1);
      setSurface("lockPrompt");
      return;
    }

    setSurface("externalApp");
  };

  const returnHome = () => {
    setActiveAppId(null);
    setApprovedUseMinutes(null);
    setRouteOverlayOpen(false);
    setSurface("phoneHome");
  };

  const restartOnboarding = () => {
    setOnboarded(false);
    setRoute("home");
    setRouteOverlayOpen(false);
    setSurface("ailock");
  };

  const handleBack = () => {
    if (surface === "ailock") {
      if (routeOverlayOpen) {
        setRouteOverlayOpen(false);
        return;
      }

      if (onboarded && route !== "home") {
        setRoute("home");
        return;
      }
    }

    returnHome();
  };

  let phoneContent: ReactNode = <SitePhoneHomeMock activeAppId={activeAppId} onOpenApp={openApp} />;

  if (surface === "ailock") {
    phoneContent = renderAilockApp({
      onboarded,
      restartOnboarding,
      route,
      routeOverlayOpen,
      setOnboarded,
      setRoute,
      setRouteOverlayOpen,
    });
  } else if (surface === "externalApp" && activeApp) {
    phoneContent = <SiteExternalAppMock accessMinutes={approvedUseMinutes} app={activeApp} onReturnHome={returnHome} />;
  } else if (surface === "lockPrompt" && activeApp) {
    phoneContent = (
      <div className="site-phone-lock">
        <SitePhoneHomeMock activeAppId={activeAppId} onOpenApp={openApp} />
        <div className="site-phone-lock-overlay">
          <ReasonComposer
            appName={activeApp.name}
            key={`${activeApp.id}-${reasonSession}`}
            onDismiss={returnHome}
            onUseApp={(minutes) => {
              setApprovedUseMinutes(minutes);
              setSurface("externalApp");
            }}
            scenario={sitePhoneReasonScenarios[activeApp.id]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="site-phone-flow">
      <PhoneFrame mode="screen">
        <SitePhoneGestureLayer onBack={handleBack} onHome={returnHome}>
          {phoneContent}
        </SitePhoneGestureLayer>
      </PhoneFrame>
    </div>
  );
}
