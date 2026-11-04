import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "../../components/AppHeader";
import { Button, IconButton } from "../../components/Button";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../data/catalog";
import { colors, fonts, radius, shadows } from "../../theme";

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lines, subtotal, setQty, remove } = useCart();
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <AppHeader
        eyebrow={lines.length ? `${lines.length} ${lines.length === 1 ? "piece" : "pieces"}` : undefined}
        title="Your bag"
        actions={["heart"]}
      />

      {lines.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="bag-handle-outline" size={36} color={colors.crimson} />
          </View>
          <Text style={styles.emptyTitle}>Your bag is still quiet</Text>
          <Text style={styles.emptyBody}>
            Add a serum, a bottle of Fuji water, or nama chocolate to begin the ritual.
          </Text>
          <Button
            label="Browse the catalog"
            iconRight="arrow-forward"
            onPress={() => router.push("/shop")}
            style={styles.emptyCta}
          />
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
                    <View style={styles.stepper}>
                      <IconButton
                        icon="remove"
                        label="Decrease quantity"
                        variant="plain"
                        size={30}
                        onPress={() => setQty(line.product.id, line.qty - 1)}
                      />
                      <Text style={styles.qty}>{line.qty}</Text>
                      <IconButton
                        icon="add"
                        label="Increase quantity"
                        variant="dark"
                        size={30}
                        onPress={() => setQty(line.product.id, line.qty + 1)}
                      />
                    </View>
                    <IconButton
                      icon="trash-outline"
                      label="Remove"
                      variant="plain"
                      size={34}
                      onPress={() => remove(line.product.id)}
                    />
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
            <Button
              label="Proceed to checkout"
              size="lg"
              icon="lock-closed-outline"
              fullWidth
              onPress={() => router.push("/checkout")}
              style={styles.cta}
            />
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
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.blush,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyCta: { marginTop: 24, alignSelf: "center" },
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
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    marginBottom: 12,
    padding: 10,
    gap: 12,
    ...shadows.soft,
  },
  thumb: { width: 92, height: 92, borderRadius: radius.md, backgroundColor: colors.paperWarm },
  meta: { flex: 1 },
  itemName: { fontFamily: fonts.sans, color: colors.ink, fontSize: 14 },
  itemPrice: { marginTop: 6, fontFamily: fonts.serif, fontSize: 16, color: colors.ink },
  qtyRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 3,
    borderRadius: radius.full,
    backgroundColor: colors.paper,
  },
  qty: { fontFamily: fonts.serif, fontSize: 16, minWidth: 20, textAlign: "center", color: colors.ink },
  summary: {
    padding: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    ...shadows.lifted,
  },
  sumRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  sumLabel: { fontFamily: fonts.sans, color: colors.stone, fontSize: 13 },
  sumValue: { fontFamily: fonts.serif, color: colors.ink, fontSize: 15 },
  strong: { color: colors.ink, fontSize: 16 },
  hairline: { height: StyleSheet.hairlineWidth, backgroundColor: colors.line, marginVertical: 8 },
  cta: { marginTop: 14 },
});
