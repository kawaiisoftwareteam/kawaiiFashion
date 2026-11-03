import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../theme";

export function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.wrap}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {action ? <Text style={styles.action}>{action}</Text> : null}
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
    fontFamily: fonts.sans,
    color: colors.stone,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
