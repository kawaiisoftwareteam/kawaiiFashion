import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../data/catalog";
import { colors, fonts } from "../../theme";

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lines, subtotal, setQty, remove } = useCart();
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Your bag</Text>
      </View>

      {lines.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Your bag is still quiet</Text>
          <Text style={styles.emptyBody}>
            Add a serum, a bottle of Fuji water, or nama chocolate to begin the ritual.
          </Text>
          <Pressable onPress={() => router.push("/shop")} style={styles.cta}>
            <Text style={styles.ctaText}>Browse the catalog</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
            {lines.map((line) => (
              <View key={line.product.id} style={styles.row}>
                <Image source={line.product.image} style={styles.thumb} contentFit="cover" />
                <View style={styles.meta}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {line.product.name}
                  </Text>
                  <Text style={styles.itemPrice}>{formatPrice(line.product.price)}</Text>
                  <View style={styles.qtyRow}>
                    <Pressable onPress={() => setQty(line.product.id, line.qty - 1)} style={styles.qtyBtn}>
                      <Text style={styles.qtyMark}>–</Text>
                    </Pressable>
                    <Text style={styles.qty}>{line.qty}</Text>
                    <Pressable onPress={() => setQty(line.product.id, line.qty + 1)} style={styles.qtyBtn}>
                      <Text style={styles.qtyMark}>+</Text>
                    </Pressable>
                    <Pressable onPress={() => remove(line.product.id)}>
                      <Text style={styles.remove}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.summary}>
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "Complimentary" : formatPrice(shipping)} />
            <View style={styles.hairline} />
            <Row label="Total" value={formatPrice(total)} strong />
            <Pressable onPress={() => router.push("/checkout")} style={styles.cta}>
              <Text style={styles.ctaText}>Proceed to checkout</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <View style={styles.sumRow}>
      <Text style={[styles.sumLabel, strong && styles.strong]}>{label}</Text>
      <Text style={[styles.sumValue, strong && styles.strong]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  emptyTitle: { fontFamily: fonts.serif, fontSize: 24, color: colors.ink },
  emptyBody: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: fonts.sans,
    color: colors.stone,
    lineHeight: 20,
  },
  list: { padding: 20, paddingBottom: 12 },
  row: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    marginBottom: 12,
    padding: 10,
    gap: 12,
  },
  thumb: { width: 88, height: 88, backgroundColor: colors.paperWarm },
  meta: { flex: 1 },
  itemName: { fontFamily: fonts.sans, color: colors.ink, fontSize: 14 },
  itemPrice: { marginTop: 6, fontFamily: fonts.serif, fontSize: 16, color: colors.ink },
  qtyRow: { marginTop: 8, flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: {
    width: 26,
    height: 26,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyMark: { fontSize: 16, color: colors.ink },
  qty: { fontFamily: fonts.serif, fontSize: 16, minWidth: 16, textAlign: "center" },
  remove: { fontFamily: fonts.sans, fontSize: 11, color: colors.stone, letterSpacing: 0.6 },
  summary: {
    padding: 20,
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  sumRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  sumLabel: { fontFamily: fonts.sans, color: colors.stone, fontSize: 13 },
  sumValue: { fontFamily: fonts.serif, color: colors.ink, fontSize: 15 },
  strong: { color: colors.ink, fontSize: 16 },
  hairline: { height: StyleSheet.hairlineWidth, backgroundColor: colors.line, marginVertical: 8 },
  cta: {
    marginTop: 14,
    backgroundColor: colors.crimson,
    alignItems: "center",
    paddingVertical: 14,
  },
  ctaText: {
    color: colors.white,
    fontFamily: fonts.sans,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontSize: 12,
  },
});
