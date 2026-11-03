import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../../context/CartContext";
import { colors, fonts } from "../../theme";

const ROWS = [
  "Order history",
  "Addresses",
  "Payment methods",
  "Saved pieces",
  "Language & currency",
  "Concierge",
];

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const { count } = useCart();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 40 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Atelier member</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.cardBrand}>KAWAII BEAUTY</Text>
          <Text style={styles.cardSeal}>Member</Text>
        </View>
        <Text style={styles.cardName}>Guest</Text>
        <Text style={styles.cardMeta}>Silver house account · {count} items in bag</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardNote}>Ships from Tokyo & Kyoto</Text>
          <Text style={styles.cardNote}>Free shipping $50+</Text>
        </View>
      </View>

      <View style={styles.list}>
        {ROWS.map((row) => (
          <Pressable key={row} style={styles.row}>
            <Text style={styles.rowEn}>{row}</Text>
            <Text style={styles.chev}>›</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.footnote}>
        A quiet Japanese house for beauty, water, confection, and tech. Est. Tokyo.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  header: { paddingHorizontal: 20, marginBottom: 16 },
  title: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink },
  card: {
    marginHorizontal: 20,
    backgroundColor: colors.ink,
    padding: 22,
    marginBottom: 22,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardBrand: {
    color: colors.goldSoft,
    letterSpacing: 2.2,
    fontFamily: fonts.sans,
    fontSize: 11,
  },
  cardSeal: {
    color: colors.goldSoft,
    fontFamily: fonts.serif,
    fontSize: 16,
  },
  cardName: {
    marginTop: 28,
    color: colors.white,
    fontFamily: fonts.serif,
    fontSize: 26,
  },
  cardMeta: {
    marginTop: 6,
    color: "rgba(255,253,248,0.64)",
    fontFamily: fonts.sans,
    fontSize: 13,
  },
  cardFooter: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNote: { color: colors.gold, fontFamily: fonts.serif, fontSize: 12 },
  list: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowEn: { fontFamily: fonts.sans, fontSize: 15, color: colors.ink },
  chev: { fontSize: 22, color: colors.stone, marginTop: -4 },
  footnote: {
    marginTop: 24,
    marginHorizontal: 24,
    textAlign: "center",
    fontFamily: fonts.serif,
    color: colors.stone,
    fontSize: 13,
    lineHeight: 20,
  },
});
