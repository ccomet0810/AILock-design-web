import type { ReasonDecisionScenario } from "../components/ailock";

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
    limitSeconds: 30 * 60,
    locked: true,
    name: "Minecraft",
    remainingSeconds: 0,
    usageLabel: "오늘 16분 사용",
  },
];

export const sitePhoneReasonScenarios: Partial<Record<SitePhoneAppId, ReasonDecisionScenario>> = {
  youtube: {
    allowAfterAttempts: 1,
    allowMessage: "좋아. 5분만 사용할 수 있어.",
    allowMinutes: 5,
    extendMessage: "좋아. 10분으로 늘릴게.",
    extendMinutes: 10,
    maxedMessage: "이미 10분까지 허용했어. 지금은 사용해.",
  },
  instagram: {
    allowAfterAttempts: 3,
    allowMessage: "좋아. 5분만 사용할 수 있어.",
    allowMinutes: 5,
    denyMessages: [
      "지금은 안 돼. 이유가 확실하지 않아.\n육하원칙에 따라서 말해줘.",
      "아직 부족해. 목적과 시간을 더 분명하게 말해.",
    ],
    extendMessage: "좋아. 10분으로 늘릴게.",
    extendMinutes: 10,
    maxedMessage: "이미 10분까지 허용했어. 지금은 사용해.",
  },
  minecraft: {
    allowAfterAttempts: null,
    denyMessages: [
      "지금은 안 돼. Minecraft는 잠금 상태야.",
      "계속 요청해도 지금은 안 돼.\n다른 일을 먼저 끝내.",
      "허용하지 않아. 지금은 Minecraft를 열 수 없어.",
    ],
  },
};
