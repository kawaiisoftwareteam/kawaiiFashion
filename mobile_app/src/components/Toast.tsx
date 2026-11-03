import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";
import { colors, fonts, radius } from "../theme";

export function Toast() {
  const { toast } = useCart();
  const insets = useSafeAreaInsets();
  if (!toast) return null;

  return (
    <View style={[styles.wrap, { bottom: insets.bottom + 88 }]} pointerEvents="none">
      <View style={styles.card}>
        <Text style={styles.text}>{toast}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 24,
    right: 24,
    alignItems: "center",
  },
  card: {
    backgroundColor: colors.ink,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: radius.full,
  },
  text: {
    color: colors.white,
    fontFamily: fonts.sans,
    fontSize: 13,
  },
});
