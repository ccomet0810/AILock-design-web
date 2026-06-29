import { apps } from "./sampleData";
import type { AppCatalogId, AppCategoryId } from "./appCatalog";

export type DemoTimeValue = {
  hours: number;
  minutes: number;
};

export type DemoUsageApp = {
  categoryId: AppCategoryId;
  color: string;
  helper: string;
  id: AppCatalogId;
  letter: string;
  name: string;
  progress: number;
  selected: boolean;
  time: string;
};

export type DemoUsageGraphDatum = {
  label: string;
  minutes: number;
  shortLabel?: string;
};

export const recordUsageApps: DemoUsageApp[] = [...apps];

const recordUsageAppById = Object.fromEntries(recordUsageApps.map((app) => [app.id, app])) as Record<
  AppCatalogId,
  DemoUsageApp
>;

export const defaultLockTimer: DemoTimeValue = { hours: 0, minutes: 25 };

export const initialLockedAppTimers: Array<{ app: DemoUsageApp; timer: DemoTimeValue }> = [
  { app: recordUsageAppById.youtube, timer: { hours: 0, minutes: 30 } },
  { app: recordUsageAppById.chrome, timer: { hours: 0, minutes: 45 } },
];

const weeklyUsageLabels = [
  { label: "월요일", shortLabel: "월" },
  { label: "화요일", shortLabel: "화" },
  { label: "수요일", shortLabel: "수" },
  { label: "목요일", shortLabel: "목" },
  { label: "금요일", shortLabel: "금" },
  { label: "토요일", shortLabel: "토" },
  { label: "일요일", shortLabel: "일" },
] as const;

const weeklyUsageMinutesByAppId: Record<AppCatalogId, number[]> = {
  youtube: [58, 74, 42, 96, 83, 121, 68],
  netflix: [22, 0, 36, 18, 44, 76, 51],
  instagram: [48, 56, 63, 39, 71, 92, 54],
  kakaoTalk: [31, 44, 52, 47, 38, 42, 29],
  chrome: [27, 35, 49, 32, 41, 58, 25],
  naver: [34, 28, 43, 36, 52, 47, 31],
  coupang: [18, 21, 15, 29, 36, 44, 24],
  baemin: [12, 17, 9, 22, 31, 28, 16],
};

export function getWeeklyUsageDataForApp(appId: AppCatalogId): DemoUsageGraphDatum[] {
  return weeklyUsageLabels.map((day, index) => ({
    ...day,
    minutes: weeklyUsageMinutesByAppId[appId][index] ?? 0,
  }));
}
