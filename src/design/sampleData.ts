import { appCatalogItemsForDesign, type AppCatalogId } from "./appCatalog";

type AppSampleMetrics = {
  helper: string;
  progress: number;
  selected: boolean;
  time: string;
};

function createAppSample<TId extends AppCatalogId>(id: TId, metrics: AppSampleMetrics) {
  const app = appCatalogItemsForDesign[id];
  return {
    id,
    categoryId: app.categoryId,
    name: app.name,
    color: app.color,
    letter: app.letter,
    ...metrics,
  };
}

export const apps = [
  createAppSample("youtube", {
    helper: "오늘 사용 1시간 22분",
    selected: true,
    progress: 0.68,
    time: "1시간 22분",
  }),
  createAppSample("netflix", {
    helper: "오늘 사용 35분",
    selected: false,
    progress: 0.29,
    time: "35분",
  }),
  createAppSample("instagram", {
    helper: "오늘 사용 55분",
    selected: false,
    progress: 0.46,
    time: "55분",
  }),
  createAppSample("kakaoTalk", {
    helper: "오늘 사용 48분",
    selected: false,
    progress: 0.4,
    time: "48분",
  }),
  createAppSample("chrome", {
    helper: "오늘 사용 38분",
    selected: false,
    progress: 0.32,
    time: "38분",
  }),
  createAppSample("naver", {
    helper: "오늘 사용 41분",
    selected: false,
    progress: 0.34,
    time: "41분",
  }),
  createAppSample("coupang", {
    helper: "오늘 사용 31분",
    selected: false,
    progress: 0.26,
    time: "31분",
  }),
  createAppSample("baemin", {
    helper: "오늘 사용 24분",
    selected: false,
    progress: 0.2,
    time: "24분",
  }),
] as const;

export const permissionRows = [
  {
    title: "사용 기록 접근",
    description: "현재 사용량과 잠금 시간을 계산",
    icon: "history",
    granted: false,
  },
  {
    title: "접근성 서비스",
    description: "잠금 앱 실행 감지와 이동 유도",
    icon: "accessibility",
    granted: true,
  },
  {
    title: "다른 앱 위에 표시",
    description: "잠금 오버레이 화면 표시",
    icon: "layers",
    granted: false,
  },
  {
    title: "알림 허용",
    description: "잠금 상태를 백그라운드에서 유지",
    icon: "notifications",
    granted: false,
  },
] as const;
