import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "../../components/AppHeader";
import { Button, IconButton, type IconName } from "../../components/Button";
import { useCart } from "../../context/CartContext";
import { formatPrice, getBrand, getProduct } from "../../data/catalog";
import { colors, fonts, radius, shadows } from "../../theme";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProduct(id);
  const brand = product ? getBrand(product.brandId) : undefined;
  const { add } = useCart();
  const insets = useSafeAreaInsets();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.missing}>Piece not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.hero}>
          <Image source={product.image} style={styles.image} contentFit="cover" />
          <AppHeader back overlay topInset={insets.top} actions={["heart", "bag"]} />
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.tagline}>{product.tagline}</Text>
          <View style={styles.meta}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <Text style={styles.origin}>
              {brand?.name} · {product.origin}
            </Text>
          </View>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Ionicons
                key={n}
                name={
                  product.rating >= n ? "star" : product.rating >= n - 0.5 ? "star-half" : "star-outline"
                }
                size={14}
                color={colors.gold}
              />
            ))}
            <Text style={styles.reviews}>{product.reviewsCount} atelier notes</Text>
          </View>

          <View style={styles.perks}>
            <Perk icon="airplane-outline" label="Ships from Tokyo" />
            <Perk icon="shield-checkmark-outline" label="Authentic" />
            <Perk icon="refresh-outline" label="30-day returns" />
          </View>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.block}>
            <Text style={styles.blockTitle}>Ingredients</Text>
            <Text style={styles.blockBody}>{product.ingredients}</Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.blockTitle}>How to use</Text>
            <Text style={styles.blockBody}>{product.usage}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={styles.qty}>
          <IconButton
            icon="remove"
            label="Decrease quantity"
            variant="plain"
            size={40}
            onPress={() => setQty((n) => Math.max(1, n - 1))}
          />
          <Text style={styles.qtyVal}>{qty}</Text>
          <IconButton
            icon="add"
            label="Increase quantity"
            variant="plain"
            size={40}
            onPress={() => setQty((n) => n + 1)}
          />
        </View>
        <Button
          label={`Add to bag · ${formatPrice(product.price * qty)}`}
          icon="bag-add-outline"
          size="lg"
          onPress={() => add(product, qty)}
          style={styles.add}
        />
      </View>
    </View>
  );
}

function Perk({ icon, label }: { icon: IconName; label: string }) {
  return (
    <View style={styles.perk}>
      <Ionicons name={icon} size={18} color={colors.crimson} />
      <Text style={styles.perkText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  center: { alignItems: "center", justifyContent: "center" },
  missing: { fontFamily: fonts.serif, fontSize: 20, color: colors.ink },
  hero: { height: 420, backgroundColor: colors.paperWarm },
  image: { width: "100%", height: "100%" },
  body: {
    marginTop: -24,
    padding: 22,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    backgroundColor: colors.paper,
  },
  name: { fontFamily: fonts.serif, fontSize: 28, lineHeight: 34, color: colors.ink },
  tagline: { marginTop: 8, fontFamily: fonts.sans, color: colors.stone, fontSize: 13, letterSpacing: 0.4 },
  meta: { marginTop: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  price: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink },
  origin: { fontFamily: fonts.sans, fontSize: 12, color: colors.stone },
  rating: { marginTop: 10, flexDirection: "row", alignItems: "center", gap: 2 },
  reviews: { marginLeft: 8, color: colors.stone, fontFamily: fonts.sans, fontSize: 12 },
  perks: {
    marginTop: 18,
    flexDirection: "row",
    gap: 8,
  },
  perk: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  perkText: { fontFamily: fonts.sans, fontSize: 10, color: colors.inkSoft, letterSpacing: 0.4 },
  description: { marginTop: 18, fontFamily: fonts.sans, fontSize: 15, lineHeight: 24, color: colors.inkSoft },
  block: {
    marginTop: 22,
    paddingTop: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  blockTitle: { fontFamily: fonts.sans, fontSize: 16, color: colors.ink },
  blockBody: { marginTop: 8, fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.inkSoft },
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    ...shadows.lifted,
  },
  qty: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 4,
    borderRadius: radius.full,
    backgroundColor: colors.paper,
  },
  qtyVal: { minWidth: 24, textAlign: "center", fontFamily: fonts.serif, fontSize: 18, color: colors.ink },
  add: { flex: 1 },
});
