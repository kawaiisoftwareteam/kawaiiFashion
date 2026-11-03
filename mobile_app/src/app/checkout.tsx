import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/catalog";
import { colors, fonts } from "../theme";

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 6;

  if (placed) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <Text style={styles.thanks}>Thank you</Text>
        <Text style={styles.noteHead}>Your atelier order is received</Text>
        <Text style={styles.note}>A quiet confirmation will arrive shortly.</Text>
        <Pressable
          onPress={() => {
            clear();
            router.replace("/");
          }}
          style={styles.cta}
        >
          <Text style={styles.ctaText}>Return home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 40 }}
    >
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>Back to bag</Text>
      </Pressable>
      <Text style={styles.title}>Checkout</Text>

      <Field label="Name" placeholder="Aiko Tanaka" />
      <Field label="Email" placeholder="aiko@email.com" />
      <Field label="Address" placeholder="Shibuya, Tokyo" />
      <Field label="Postal code" placeholder="150-0001" />

      <View style={styles.box}>
        {lines.map((line) => (
          <View key={line.product.id} style={styles.line}>
            <Text style={styles.lineName} numberOfLines={1}>
              {line.product.name} × {line.qty}
            </Text>
            <Text style={styles.linePrice}>{formatPrice(line.product.price * line.qty)}</Text>
          </View>
        ))}
        <View style={styles.hairline} />
        <View style={styles.line}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>{formatPrice(subtotal + shipping)}</Text>
        </View>
      </View>

      <Pressable onPress={() => setPlaced(true)} style={styles.cta}>
        <Text style={styles.ctaText}>Place order</Text>
      </Pressable>
    </ScrollView>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholder={placeholder} placeholderTextColor={colors.stone} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: 20 },
  center: { alignItems: "center", justifyContent: "center", padding: 32 },
  back: { marginBottom: 16 },
  backText: { fontFamily: fonts.serif, color: colors.stone, fontSize: 14 },
  title: { marginBottom: 20, fontFamily: fonts.serif, fontSize: 28, color: colors.ink },
  field: { marginBottom: 14 },
  label: { fontFamily: fonts.sans, fontSize: 11, color: colors.stone, letterSpacing: 0.6, marginBottom: 6 },
  input: {
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: fonts.sans,
    color: colors.ink,
    fontSize: 15,
  },
  box: {
    marginTop: 8,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    padding: 16,
  },
  line: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  lineName: { flex: 1, marginRight: 12, fontFamily: fonts.serif, color: colors.ink, fontSize: 14 },
  linePrice: { fontFamily: fonts.serif, color: colors.ink },
  hairline: { height: StyleSheet.hairlineWidth, backgroundColor: colors.line, marginVertical: 8 },
  totalLabel: { fontFamily: fonts.serif, fontSize: 16, color: colors.ink },
  total: { fontFamily: fonts.serif, fontSize: 20, color: colors.ink },
  cta: { marginTop: 22, backgroundColor: colors.crimson, alignItems: "center", paddingVertical: 15 },
  ctaText: {
    color: colors.white,
    fontFamily: fonts.sans,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontSize: 12,
  },
  thanks: { fontFamily: fonts.serif, fontSize: 32, color: colors.ink, textAlign: "center" },
  noteHead: { marginTop: 8, fontFamily: fonts.serif, fontSize: 20, color: colors.ink, textAlign: "center" },
  note: { marginTop: 10, fontFamily: fonts.sans, color: colors.stone, textAlign: "center" },
});
