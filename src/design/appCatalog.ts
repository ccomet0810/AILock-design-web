export const appCategoryLabels = {
  entertainment: "Entertainment",
  socialMedia: "Social Media",
  utilities: "Utilities",
  shoppingFood: "Shopping & Food",
} as const;

export type AppCategoryId = keyof typeof appCategoryLabels;

export type AppCatalogItem = {
  categoryId: AppCategoryId;
  color: string;
  id: string;
  letter: string;
  name: string;
  packageName: string;
};

export const appCatalogItems = {
  youtube: {
    id: "youtube",
    packageName: "com.google.android.youtube",
    categoryId: "entertainment",
    name: "YouTube",
    color: "#FF0033",
    letter: "Y",
  },
  netflix: {
    id: "netflix",
    packageName: "com.netflix.mediaclient",
    categoryId: "entertainment",
    name: "Netflix",
    color: "#E50914",
    letter: "N",
  },
  instagram: {
    id: "instagram",
    packageName: "com.instagram.android",
    categoryId: "socialMedia",
    name: "Instagram",
    color: "#D62976",
    letter: "I",
  },
  kakaoTalk: {
    id: "kakaoTalk",
    packageName: "com.kakao.talk",
    categoryId: "socialMedia",
    name: "KakaoTalk",
    color: "#FEE500",
    letter: "K",
  },
  chrome: {
    id: "chrome",
    packageName: "com.android.chrome",
    categoryId: "utilities",
    name: "Chrome",
    color: "#4285F4",
    letter: "C",
  },
  naver: {
    id: "naver",
    packageName: "com.nhn.android.search",
    categoryId: "utilities",
    name: "Naver",
    color: "#03C75A",
    letter: "N",
  },
  coupang: {
    id: "coupang",
    packageName: "com.coupang.mobile",
    categoryId: "shoppingFood",
    name: "Coupang",
    color: "#E52528",
    letter: "C",
  },
  baemin: {
    id: "baemin",
    packageName: "com.sampleapp",
    categoryId: "shoppingFood",
    name: "Baemin",
    color: "#2AC1BC",
    letter: "B",
  },
} as const satisfies Record<string, AppCatalogItem>;

export type AppCatalogId = keyof typeof appCatalogItems;

export const appCatalog = [
  appCatalogItems.youtube,
  appCatalogItems.netflix,
  appCatalogItems.instagram,
  appCatalogItems.kakaoTalk,
  appCatalogItems.chrome,
  appCatalogItems.naver,
  appCatalogItems.coupang,
  appCatalogItems.baemin,
] as const;

export const appCatalogSections = [
  {
    id: "entertainment",
    label: appCategoryLabels.entertainment,
    appIds: ["youtube", "netflix"],
  },
  {
    id: "socialMedia",
    label: appCategoryLabels.socialMedia,
    appIds: ["instagram", "kakaoTalk"],
  },
  {
    id: "utilities",
    label: appCategoryLabels.utilities,
    appIds: ["chrome", "naver"],
  },
  {
    id: "shoppingFood",
    label: appCategoryLabels.shoppingFood,
    appIds: ["coupang", "baemin"],
  },
] as const satisfies ReadonlyArray<{
  appIds: readonly AppCatalogId[];
  id: AppCategoryId;
  label: string;
}>;

export const appCatalogItemsForDesign = appCatalogItems;
export const appCatalogForDesign = appCatalog;
export const appCatalogSectionsForDesign = appCatalogSections;
