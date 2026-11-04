import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../theme";

export function SectionHeader({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8} style={styles.action}>
          <Text style={styles.actionText}>{action}</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.crimson} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  eyebrow: {
    fontFamily: fonts.serif,
    color: colors.gold,
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    fontFamily: fonts.sans,
    color: colors.ink,
    fontSize: 20,
    letterSpacing: 0.3,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  actionText: {
    fontFamily: fonts.sans,
    color: colors.crimson,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
});
