export const apps = [
  {
    name: "YouTube",
    helper: "하루 최대 시간 2시간",
    color: "#FF0033",
    letter: "Y",
    selected: true,
    progress: 0.68,
    time: "1시간 22분",
  },
  {
    name: "Instagram",
    helper: "설정하지 않음 · 기본 2시간",
    color: "#D62976",
    letter: "I",
    selected: false,
    progress: 0.46,
    time: "55분",
  },
  {
    name: "Chrome",
    helper: "하루 최대 시간 1시간",
    color: "#4285F4",
    letter: "C",
    selected: false,
    progress: 0.32,
    time: "38분",
  },
] as const;

export const permissionRows = [
  {
    title: "사용 기록 접근",
    description: "현재 사용량과 제한 시간을 계산",
    icon: "history",
    granted: false,
  },
  {
    title: "접근성 서비스",
    description: "제한 앱 실행 감지와 이동 유도",
    icon: "accessibility",
    granted: true,
  },
  {
    title: "다른 앱 위에 표시",
    description: "제한 안내 화면 표시",
    icon: "layers",
    granted: false,
  },
] as const;
