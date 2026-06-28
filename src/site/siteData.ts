export type SitePhoneAppId = "ailock" | "youtube" | "instagram" | "minecraft";

export type SitePhoneApp = {
  color: string;
  id: SitePhoneAppId;
  letter: string;
  limitSeconds?: number;
  locked?: boolean;
  name: string;
  remainingSeconds?: number;
  usageLabel: string;
};

export const sitePhoneApps: SitePhoneApp[] = [
  {
    color: "#F47A1C",
    id: "ailock",
    letter: "A",
    name: "AILock",
    usageLabel: "앱 설정",
  },
  {
    color: "#FF0033",
    id: "youtube",
    letter: "Y",
    limitSeconds: 20 * 60,
    locked: true,
    name: "YouTube",
    remainingSeconds: 18 * 60 + 24,
    usageLabel: "오늘 1시간 22분 사용",
  },
  {
    color: "#E4405F",
    id: "instagram",
    letter: "I",
    limitSeconds: 15 * 60,
    locked: true,
    name: "Instagram",
    remainingSeconds: 8 * 60 + 12,
    usageLabel: "오늘 48분 사용",
  },
  {
    color: "#3C8527",
    id: "minecraft",
    letter: "M",
    name: "Minecraft",
    usageLabel: "오늘 16분 사용",
  },
];
