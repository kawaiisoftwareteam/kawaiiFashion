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

export const shadows = {
  soft: Platform.select({
    ios: {
      shadowColor: colors.ink,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
    },
    default: { elevation: 3 },
  }),
  lifted: Platform.select({
    ios: {
      shadowColor: colors.ink,
      shadowOpacity: 0.16,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 10 },
    },
    default: { elevation: 12 },
  }),
  glow: Platform.select({
    ios: {
      shadowColor: colors.crimson,
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
    },
    default: { elevation: 6 },
  }),
};
