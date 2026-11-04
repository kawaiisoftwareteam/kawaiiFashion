import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { ComponentProps } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { colors, fonts, radius, shadows } from "../theme";

export type IconName = ComponentProps<typeof Ionicons>["name"];

type Variant = "primary" | "dark" | "light" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

const SIZES: Record<Size, { height: number; px: number; font: number; icon: number }> = {
  sm: { height: 38, px: 14, font: 11, icon: 15 },
  md: { height: 48, px: 20, font: 12, icon: 17 },
  lg: { height: 56, px: 24, font: 13, icon: 19 },
};

const TINT: Record<Variant, string> = {
  primary: colors.white,
  dark: colors.white,
  light: colors.ink,
  outline: colors.ink,
  ghost: colors.ink,
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading,
  disabled,
  fullWidth,
  style,
}: ButtonProps) {
  const s = SIZES[size];
  const tint = TINT[variant];
  const inactive = disabled || loading;

  const content = (
    <View style={[styles.inner, { height: s.height, paddingHorizontal: s.px }]}>
      {loading ? (
        <ActivityIndicator color={tint} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={s.icon} color={tint} /> : null}
          <Text style={[styles.label, { color: tint, fontSize: s.font }]}>{label}</Text>
          {iconRight ? <Ionicons name={iconRight} size={s.icon} color={tint} /> : null}
        </>
      )}
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        VARIANT_STYLES[variant],
        fullWidth && styles.full,
        pressed && styles.pressed,
        inactive && styles.disabled,
        style,
      ]}
    >
      {variant === "primary" ? (
        <LinearGradient
          colors={[colors.crimson, colors.crimsonDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </Pressable>
  );
}

type IconButtonProps = {
  icon: IconName;
  onPress?: () => void;
  label: string;
  variant?: "light" | "glass" | "dark" | "plain";
  size?: number;
  badge?: number;
  active?: boolean;
  activeIcon?: IconName;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon,
  onPress,
  label,
  variant = "light",
  size = 42,
  badge,
  active,
  activeIcon,
  style,
}: IconButtonProps) {
  const tint = variant === "dark" ? colors.white : active ? colors.crimson : colors.ink;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      style={({ pressed }) => [
        styles.iconBase,
        { width: size, height: size, borderRadius: size / 2 },
        ICON_VARIANTS[variant],
        pressed && styles.pressed,
        style,
      ]}
    >
      <Ionicons name={active && activeIcon ? activeIcon : icon} size={size * 0.48} color={tint} />
      {badge ? <Badge value={badge} /> : null}
    </Pressable>
  );
}

export function Badge({ value }: { value: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{value > 99 ? "99+" : value}</Text>
    </View>
  );
}

export function Chip({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon?: IconName;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.chip, active && styles.chipOn, pressed && styles.pressed]}
    >
      {icon ? <Ionicons name={icon} size={14} color={active ? colors.white : colors.inkSoft} /> : null}
      <Text style={[styles.chipText, active && styles.chipTextOn]}>{label}</Text>
    </Pressable>
  );
}

const VARIANT_STYLES = StyleSheet.create({
  primary: { ...shadows.glow },
  dark: { backgroundColor: colors.ink, ...shadows.soft },
  light: { backgroundColor: colors.white, ...shadows.soft },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.ink,
  },
  ghost: { backgroundColor: "transparent" },
});

const ICON_VARIANTS = StyleSheet.create({
  light: {
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    ...shadows.soft,
  },
  glass: {
    backgroundColor: "rgba(255,253,248,0.88)",
    ...shadows.soft,
  },
  dark: { backgroundColor: colors.ink },
  plain: { backgroundColor: "transparent" },
});

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignSelf: "flex-start",
  },
  full: { alignSelf: "stretch" },
  gradient: { borderRadius: radius.full },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  label: {
    fontFamily: fonts.sans,
    fontWeight: "600",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.97 }] },
  disabled: { opacity: 0.45 },
  iconBase: {
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: colors.crimson,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "700",
    fontFamily: fonts.sans,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 38,
    paddingHorizontal: 16,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  chipOn: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  chipText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    letterSpacing: 0.6,
    color: colors.inkSoft,
  },
  chipTextOn: { color: colors.white },
});
