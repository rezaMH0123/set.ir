import type { JSX } from "react";

export type AppearanceItemId = keyof AppearanceJsonType;

export type AppearanceJsonType = {
  campain?: CampainType;
  "banner-slider"?: SliderBannerType[];
  "product-list-1"?: ProductListType;
  "product-list-2"?: ProductListType;
  "product-list-3"?: ProductListType;
  "product-list-4"?: ProductListType;
  "single-banner"?: SingleBannerType;
  modal?: ModalType;
  "discounted-products"?: Record<string, never>;
};

type DefaultValue<K> = K extends keyof AppearanceJsonType
  ? AppearanceJsonType[K]
  : never;

export type AppearancePageItemMap = {
  [K in AppearanceItemId]: {
    id: K;
    title: string;
    icon: JSX.Element;
    className: string;
    modalElement: React.FC<{ defaultValue: DefaultValue<K> }>;
    disabled?: boolean;
    hasTopBorder?: boolean;
  };
};

export type CampainType = {
  dateRange: EpochTimeStamp[];
  link?: string;
  imageUrl: string;
  hasTimer: boolean;
};

export type ModalType = {
  mobileImageUrl: string;
  desktopImageUrl: string;
  link: string;
};

export type SingleBannerType = {
  imageUrl: string;
  link: string;
};

export type SliderBannerType = {
  link: string;
  imageUrl: string;
};

export type ProductListType = {
  params: string;
  title: string;
};
