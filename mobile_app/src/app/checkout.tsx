import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader";
import { Button, type IconName } from "../components/Button";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/catalog";
import { colors, fonts, radius, shadows } from "../theme";

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 6;

  if (placed) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <View style={styles.success}>
          <Ionicons name="checkmark" size={40} color={colors.white} />
        </View>
        <Text style={styles.thanks}>Thank you</Text>
        <Text style={styles.noteHead}>Your atelier order is received</Text>
        <Text style={styles.note}>A quiet confirmation will arrive shortly.</Text>
        <Button
          label="Return home"
          icon="home-outline"
          onPress={() => {
            clear();
            router.replace("/");
          }}
          style={styles.doneCta}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader back title="Checkout" topInset={insets.top} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}>
        <Field label="Name" icon="person-outline" placeholder="Aiko Tanaka" />
        <Field label="Email" icon="mail-outline" placeholder="aiko@email.com" />
        <Field label="Address" icon="location-outline" placeholder="Shibuya, Tokyo" />
        <Field label="Postal code" icon="navigate-outline" placeholder="150-0001" />

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

        <Button
          label="Place order"
          icon="lock-closed-outline"
          size="lg"
          fullWidth
          onPress={() => setPlaced(true)}
          style={styles.cta}
        />
        <View style={styles.secure}>
          <Ionicons name="shield-checkmark-outline" size={14} color={colors.success} />
          <Text style={styles.secureText}>Secure, encrypted checkout</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Field({ label, icon, placeholder }: { label: string; icon: IconName; placeholder: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={18} color={colors.stone} />
        <TextInput placeholder={placeholder} placeholderTextColor={colors.stone} style={styles.input} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  center: { alignItems: "center", justifyContent: "center", padding: 32 },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  field: { marginBottom: 14 },
  label: { fontFamily: fonts.sans, fontSize: 11, color: colors.stone, letterSpacing: 0.6, marginBottom: 6 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 52,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  input: {
    flex: 1,
    fontFamily: fonts.sans,
    color: colors.ink,
    fontSize: 15,
  },
  box: {
    marginTop: 8,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    padding: 16,
    ...shadows.soft,
  },
  line: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  lineName: { flex: 1, marginRight: 12, fontFamily: fonts.serif, color: colors.ink, fontSize: 14 },
  linePrice: { fontFamily: fonts.serif, color: colors.ink },
  hairline: { height: StyleSheet.hairlineWidth, backgroundColor: colors.line, marginVertical: 8 },
  totalLabel: { fontFamily: fonts.serif, fontSize: 16, color: colors.ink },
  total: { fontFamily: fonts.serif, fontSize: 20, color: colors.ink },
  cta: { marginTop: 22 },
  secure: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  secureText: { fontFamily: fonts.sans, fontSize: 12, color: colors.stone },
  success: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    ...shadows.lifted,
  },
  thanks: { fontFamily: fonts.serif, fontSize: 32, color: colors.ink, textAlign: "center" },
  noteHead: { marginTop: 8, fontFamily: fonts.serif, fontSize: 20, color: colors.ink, textAlign: "center" },
  note: { marginTop: 10, fontFamily: fonts.sans, color: colors.stone, textAlign: "center" },
  doneCta: { marginTop: 24, alignSelf: "center" },
});
