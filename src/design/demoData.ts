import { apps } from "./sampleData";

export type DemoTimeValue = {
  hours: number;
  minutes: number;
};

export type DemoUsageApp = {
  color: string;
  helper: string;
  letter: string;
  name: string;
  progress: number;
  selected: boolean;
  time: string;
};

export const recordUsageApps: DemoUsageApp[] = [
  ...apps,
  {
    name: "TikTok",
    helper: "오늘 최대 1시간 30분",
    color: "#111111",
    letter: "T",
    selected: false,
    progress: 0.58,
    time: "1시간 07분",
  },
  {
    name: "KakaoTalk",
    helper: "오늘 최대 1시간",
    color: "#FEE500",
    letter: "K",
    selected: false,
    progress: 0.4,
    time: "48분",
  },
  {
    name: "Naver",
    helper: "오늘 최대 45분",
    color: "#03C75A",
    letter: "N",
    selected: false,
    progress: 0.34,
    time: "41분",
  },
  {
    name: "Netflix",
    helper: "오늘 최대 1시간",
    color: "#E50914",
    letter: "N",
    selected: false,
    progress: 0.29,
    time: "35분",
  },
  {
    name: "Discord",
    helper: "오늘 최대 40분",
    color: "#5865F2",
    letter: "D",
    selected: false,
    progress: 0.22,
    time: "27분",
  },
  {
    name: "X",
    helper: "오늘 최대 30분",
    color: "#1D1D1F",
    letter: "X",
    selected: false,
    progress: 0.18,
    time: "21분",
  },
  {
    name: "Threads",
    helper: "오늘 최대 30분",
    color: "#5E5CE6",
    letter: "T",
    selected: false,
    progress: 0.12,
    time: "14분",
  },
];

export const defaultLockTimer: DemoTimeValue = { hours: 0, minutes: 25 };

export const initialLockedAppTimers: Array<{ app: DemoUsageApp; timer: DemoTimeValue }> = [
  { app: recordUsageApps[0], timer: { hours: 0, minutes: 30 } },
  { app: recordUsageApps[2], timer: { hours: 0, minutes: 45 } },
];
