import { Platform } from "react-native";

export const colors = {
  crimson: "#CF3642",
  crimsonDeep: "#A42B35",
  ink: "#1C1714",
  inkSoft: "#3F3833",
  paper: "#F7F4EF",
  paperWarm: "#EFE8DE",
  white: "#FFFDF8",
  stone: "#8A847C",
  gold: "#B08D57",
  goldSoft: "#E8D7B5",
  blush: "#F3DEDF",
  line: "#E4DDD2",
  success: "#3D6B4F",
};

export const fonts = {
  serif: Platform.select({
    ios: "Hiragino Mincho ProN",
    android: "serif",
    default: "serif",
  }) as string,
  sans: Platform.select({
    ios: "Hiragino Sans",
    android: "sans-serif",
    default: "System",
  }) as string,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  full: 999,
};
