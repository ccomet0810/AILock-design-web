import "@material-symbols/font-400/rounded.css";
import type { MaterialSymbol } from "@material-symbols/font-400";
import { useId, type CSSProperties } from "react";

type IconName =
  | "home"
  | "homeFilled"
  | "records"
  | "recordsFilled"
  | "restrictions"
  | "restrictionsFilled"
  | "settings"
  | "settingsFilled"
  | "check"
  | "search"
  | "history"
  | "accessibility"
  | "layers"
  | "battery"
  | "signal"
  | "wifi"
  | "notifications"
  | "arrowForward"
  | "close"
  | "plus"
  | "heart"
  | "trash";

export type { IconName };

export const iconNames = [
  "home",
  "homeFilled",
  "records",
  "recordsFilled",
  "restrictions",
  "restrictionsFilled",
  "settings",
  "settingsFilled",
  "check",
  "search",
  "history",
  "accessibility",
  "layers",
  "battery",
  "signal",
  "wifi",
  "notifications",
  "arrowForward",
  "close",
  "plus",
  "heart",
  "trash",
] as const satisfies readonly IconName[];

const materialIcons: Record<IconName, MaterialSymbol> = {
  home: "home",
  homeFilled: "home",
  records: "bar_chart",
  recordsFilled: "bar_chart",
  restrictions: "lock_clock",
  restrictionsFilled: "lock_clock",
  settings: "settings",
  settingsFilled: "settings",
  check: "check",
  search: "search",
  history: "history",
  accessibility: "accessibility_new",
  layers: "layers",
  battery: "battery_android_full",
  signal: "signal_cellular_alt",
  wifi: "wifi",
  notifications: "notifications",
  arrowForward: "chevron_right",
  close: "close",
  plus: "add",
  heart: "favorite",
  trash: "delete",
};

const filledIcons = new Set<IconName>(["homeFilled", "recordsFilled", "restrictionsFilled", "settingsFilled"]);

export function DesignIcon({
  name,
  size = 24,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={["material-symbols-rounded", "design-icon", className].filter(Boolean).join(" ")}
      style={
        {
          "--icon-size": `${size}px`,
          "--icon-fill": filledIcons.has(name) ? 1 : 0,
        } as CSSProperties
      }
    >
      {materialIcons[name]}
    </span>
  );
}

export function BrandMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const baseGradientId = `brand-base-${id}`;
  const upperCloudGradientId = `brand-upper-cloud-${id}`;
  const voiceBandGradientId = `brand-voice-band-${id}`;
  const ambientBandGradientId = `brand-ambient-band-${id}`;
  const softRidgeGradientId = `brand-soft-ridge-${id}`;
  const lowerCloudGradientId = `brand-lower-cloud-${id}`;
  const whisperGradientId = `brand-whisper-${id}`;
  const cloudTextureGradientId = `brand-cloud-texture-fill-${id}`;
  const cloudTextureFilterId = `brand-cloud-texture-${id}`;
  const edgeShadeGradientId = `brand-edge-shade-${id}`;
  const maskId = `brand-disc-${id}`;
  const smoothLoop3 = {
    calcMode: "spline",
    keySplines: "0.42 0 0.58 1; 0.42 0 0.58 1",
    keyTimes: "0; 0.5; 1",
  } as const;
  const smoothLoop4 = {
    calcMode: "spline",
    keySplines: "0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1",
    keyTimes: "0; 0.34; 0.68; 1",
  } as const;

  return (
    <svg
      aria-hidden="true"
      className={className}
      width="128"
      height="128"
      viewBox="0 0 128 128"
      focusable="false"
    >
      <defs>
        <linearGradient id={baseGradientId} x1="45%" y1="-8%" x2="56%" y2="108%">
          <stop offset="0%" stopColor="var(--brand-cream)" />
          <stop offset="30%" stopColor="var(--app-surface-pressed)" />
          <stop offset="56%" stopColor="var(--brand-orange-hot)" />
          <stop offset="78%" stopColor="var(--brand-orange)" />
          <stop offset="100%" stopColor="var(--brand-orange-dark)" />
          <animate attributeName="x1" values="35%;58%;30%;35%" dur="16s" repeatCount="indefinite" {...smoothLoop4} />
          <animate attributeName="x2" values="66%;42%;72%;66%" dur="16s" repeatCount="indefinite" {...smoothLoop4} />
        </linearGradient>
        <radialGradient id={upperCloudGradientId} cx="34%" cy="20%" r="78%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="42%" stopColor="var(--brand-cream)" stopOpacity="0.72" />
          <stop offset="74%" stopColor="var(--app-surface-pressed)" stopOpacity="0.24" />
          <stop offset="100%" stopColor="var(--app-surface-pressed)" stopOpacity="0" />
          <animate attributeName="cx" values="22%;56%;30%;22%" dur="13s" repeatCount="indefinite" {...smoothLoop4} />
          <animate attributeName="cy" values="8%;40%;16%;8%" dur="13s" repeatCount="indefinite" {...smoothLoop4} />
        </radialGradient>
        <linearGradient id={voiceBandGradientId} x1="-12%" y1="8%" x2="114%" y2="78%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="24%" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="43%" stopColor="#FFF8E8" stopOpacity="0.76" />
          <stop offset="60%" stopColor="#FFD39A" stopOpacity="0.5" />
          <stop offset="78%" stopColor="var(--brand-orange-hot)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--brand-orange-hot)" stopOpacity="0" />
          <animate attributeName="x1" values="-40%;14%;-48%;-40%" dur="10s" repeatCount="indefinite" {...smoothLoop4} />
          <animate attributeName="x2" values="86%;142%;98%;86%" dur="10s" repeatCount="indefinite" {...smoothLoop4} />
        </linearGradient>
        <linearGradient id={ambientBandGradientId} x1="116%" y1="10%" x2="-12%" y2="86%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="52%" stopColor="var(--brand-cream)" stopOpacity="0.38" />
          <stop offset="72%" stopColor="#FFB35D" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFB35D" stopOpacity="0" />
          <animate attributeName="x1" values="138%;82%;146%;138%" dur="14s" repeatCount="indefinite" {...smoothLoop4} />
          <animate attributeName="x2" values="-34%;18%;-42%;-34%" dur="14s" repeatCount="indefinite" {...smoothLoop4} />
        </linearGradient>
        <linearGradient id={softRidgeGradientId} x1="-10%" y1="72%" x2="112%" y2="18%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="28%" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="46%" stopColor="#FFF5DC" stopOpacity="0.7" />
          <stop offset="61%" stopColor="#FFD0A0" stopOpacity="0.4" />
          <stop offset="80%" stopColor="var(--brand-orange)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--brand-orange)" stopOpacity="0" />
          <animate attributeName="x1" values="-34%;16%;-42%;-34%" dur="16s" repeatCount="indefinite" {...smoothLoop4} />
          <animate attributeName="x2" values="92%;140%;100%;92%" dur="16s" repeatCount="indefinite" {...smoothLoop4} />
        </linearGradient>
        <radialGradient id={lowerCloudGradientId} cx="56%" cy="84%" r="72%">
          <stop offset="0%" stopColor="var(--brand-orange)" stopOpacity="0.86" />
          <stop offset="48%" stopColor="#E86312" stopOpacity="0.58" />
          <stop offset="100%" stopColor="var(--brand-orange-dark)" stopOpacity="0" />
          <animate attributeName="cx" values="60%;34%;76%;60%" dur="12s" repeatCount="indefinite" {...smoothLoop4} />
          <animate attributeName="cy" values="90%;64%;98%;90%" dur="12s" repeatCount="indefinite" {...smoothLoop4} />
        </radialGradient>
        <radialGradient id={whisperGradientId} cx="26%" cy="48%" r="68%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.56" />
          <stop offset="52%" stopColor="var(--brand-cream)" stopOpacity="0.24" />
          <stop offset="100%" stopColor="var(--brand-cream)" stopOpacity="0" />
          <animate attributeName="cx" values="8%;52%;18%;8%" dur="18s" repeatCount="indefinite" {...smoothLoop4} />
          <animate attributeName="cy" values="48%;30%;66%;48%" dur="18s" repeatCount="indefinite" {...smoothLoop4} />
        </radialGradient>
        <linearGradient id={cloudTextureGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="46%" stopColor="var(--brand-cream)" stopOpacity="0.42" />
          <stop offset="100%" stopColor="var(--brand-orange)" stopOpacity="0.14" />
        </linearGradient>
        <filter id={cloudTextureFilterId} x="-18%" y="-18%" width="136%" height="136%" colorInterpolationFilters="sRGB">
          <feTurbulence baseFrequency="0.018 0.03" numOctaves="2" seed="11" type="fractalNoise" result="cloudNoise">
            <animate attributeName="baseFrequency" values="0.016 0.028;0.034 0.046;0.014 0.024;0.016 0.028" dur="12s" repeatCount="indefinite" {...smoothLoop4} />
          </feTurbulence>
          <feGaussianBlur in="cloudNoise" stdDeviation="2.8" result="softCloudNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softCloudNoise" scale="14" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" values="12;20;8;12" dur="12s" repeatCount="indefinite" {...smoothLoop4} />
          </feDisplacementMap>
        </filter>
        <radialGradient id={edgeShadeGradientId} cx="48%" cy="42%" r="68%">
          <stop offset="58%" stopColor="var(--brand-brown)" stopOpacity="0" />
          <stop offset="86%" stopColor="var(--brand-brown)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--brand-orange-dark)" stopOpacity="0.18" />
        </radialGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="4" y="4" width="120" height="120">
          <circle cx="64" cy="64" r="56" fill="#fff" />
        </mask>
      </defs>
      <g className="brand-orb" mask={`url(#${maskId})`}>
        <circle className="brand-orb-base" cx="64" cy="64" r="56" fill={`url(#${baseGradientId})`} />
        <g className="brand-orb-clouds">
          <rect x="-26" y="-22" width="180" height="170" fill={`url(#${upperCloudGradientId})`} opacity="0.9">
            <animateTransform attributeName="transform" type="translate" values="-18 10; 18 -14; -6 16; -18 10" dur="13s" repeatCount="indefinite" {...smoothLoop4} />
          </rect>
          <rect x="-34" y="-20" width="196" height="166" fill={`url(#${voiceBandGradientId})`} opacity="0.88" style={{ mixBlendMode: "screen" }}>
            <animateTransform attributeName="transform" type="translate" values="-30 4; 22 20; -18 -14; -30 4" dur="10s" repeatCount="indefinite" {...smoothLoop4} />
          </rect>
          <rect x="-36" y="-8" width="200" height="154" fill={`url(#${ambientBandGradientId})`} opacity="0.62" style={{ mixBlendMode: "screen" }}>
            <animateTransform attributeName="transform" type="translate" values="24 -12; -22 14; 10 22; 24 -12" dur="14s" repeatCount="indefinite" {...smoothLoop4} />
          </rect>
          <rect x="-36" y="-18" width="200" height="168" fill={`url(#${softRidgeGradientId})`} opacity="0.78" style={{ mixBlendMode: "screen" }}>
            <animateTransform attributeName="transform" type="translate" values="-26 16; 26 -12; -14 22; -26 16" dur="16s" repeatCount="indefinite" {...smoothLoop4} />
          </rect>
          <rect x="-24" y="2" width="176" height="154" fill={`url(#${lowerCloudGradientId})`} opacity="0.9" style={{ mixBlendMode: "multiply" }}>
            <animateTransform attributeName="transform" type="translate" values="10 24; -24 -8; 26 10; 10 24" dur="12s" repeatCount="indefinite" {...smoothLoop4} />
          </rect>
          <rect x="-28" y="-16" width="184" height="160" fill={`url(#${whisperGradientId})`} opacity="0.68" style={{ mixBlendMode: "screen" }}>
            <animateTransform attributeName="transform" type="translate" values="-20 -8; 18 12; -6 24; -20 -8" dur="18s" repeatCount="indefinite" {...smoothLoop4} />
          </rect>
          <rect x="-28" y="-22" width="184" height="174" fill={`url(#${cloudTextureGradientId})`} filter={`url(#${cloudTextureFilterId})`} opacity="0.34" style={{ mixBlendMode: "screen" }}>
            <animateTransform attributeName="transform" type="translate" values="-18 10; 22 -12; -12 16; -18 10" dur="12s" repeatCount="indefinite" {...smoothLoop4} />
          </rect>
          <animateTransform attributeName="transform" type="translate" values="-7 4; 7 -5; -7 4" dur="9s" repeatCount="indefinite" {...smoothLoop3} />
        </g>
        <circle cx="64" cy="64" r="56" fill={`url(#${edgeShadeGradientId})`} opacity="0.72" style={{ mixBlendMode: "multiply" }} />
      </g>
    </svg>
  );
}
