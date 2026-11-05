import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "../../components/AppHeader";
import { Button, type IconName } from "../../components/Button";
import { useCart } from "../../context/CartContext";
import { colors, fonts, radius, shadows } from "../../theme";

const ROWS: { label: string; icon: IconName }[] = [
  { label: "Order history", icon: "receipt-outline" },
  { label: "Addresses", icon: "location-outline" },
  { label: "Payment methods", icon: "card-outline" },
  { label: "Saved pieces", icon: "heart-outline" },
  { label: "Language & currency", icon: "globe-outline" },
  { label: "Concierge", icon: "chatbubble-ellipses-outline" },
];

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { count } = useCart();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 40 }}
    >
      <AppHeader eyebrow="Welcome back" title="Atelier member" actions={["bag"]} />

      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.cardBrand}>KAWAII MART</Text>
          <View style={styles.cardSealRow}>
            <Ionicons name="diamond-outline" size={14} color={colors.goldSoft} />
            <Text style={styles.cardSeal}>Member</Text>
          </View>
        </View>
        <Text style={styles.cardName}>Guest</Text>
        <Text style={styles.cardMeta}>Silver house account · {count} items in bag</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardNote}>Ships from Tokyo & Kyoto</Text>
          <Text style={styles.cardNote}>Free shipping $50+</Text>
        </View>
      </View>

      <View style={styles.list}>
        {ROWS.map((row, i) => (
          <Pressable
            key={row.label}
            style={({ pressed }) => [
              styles.row,
              i === ROWS.length - 1 && styles.rowLast,
              pressed && styles.rowPressed,
            ]}
          >
            <View style={styles.rowIcon}>
              <Ionicons name={row.icon} size={18} color={colors.crimson} />
            </View>
            <Text style={styles.rowEn}>{row.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.stone} />
          </Pressable>
        ))}
      </View>

      <Button
        label="Sign in or join"
        variant="dark"
        icon="log-in-outline"
        fullWidth
        style={styles.signIn}
        onPress={() => router.push("/login")}
      />

      <Text style={styles.footnote}>
        A quiet Japanese house for beauty, water, confection, and tech. Est. Tokyo.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  card: {
    marginHorizontal: 20,
    marginTop: 4,
    backgroundColor: colors.ink,
    borderRadius: radius.lg,
    padding: 22,
    marginBottom: 22,
    ...shadows.lifted,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardSealRow: { flexDirection: "row", alignItems: "center", gap: 6 },
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
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    overflow: "hidden",
    ...shadows.soft,
  },
  row: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowLast: { borderBottomWidth: 0 },
  rowPressed: { backgroundColor: colors.paper },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.blush,
    alignItems: "center",
    justifyContent: "center",
  },
  rowEn: { flex: 1, fontFamily: fonts.sans, fontSize: 15, color: colors.ink },
  signIn: { marginHorizontal: 20, marginTop: 20 },
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
