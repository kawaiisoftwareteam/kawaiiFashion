import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../../context/CartContext";
import { formatPrice, getBrand, getProduct } from "../../data/catalog";
import { colors, fonts } from "../../theme";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProduct(id);
  const brand = product ? getBrand(product.brandId) : undefined;
  const { add } = useCart();
  const router = useRouter();
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
          <Pressable onPress={() => router.back()} style={[styles.back, { top: insets.top + 8 }]}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
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
          <Text style={styles.rating}>
            {"★".repeat(Math.round(product.rating))}
            <Text style={styles.reviews}>  {product.reviewsCount} atelier notes</Text>
          </Text>
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
          <Pressable onPress={() => setQty((n) => Math.max(1, n - 1))} style={styles.qtyBtn}>
            <Text style={styles.qtyMark}>–</Text>
          </Pressable>
          <Text style={styles.qtyVal}>{qty}</Text>
          <Pressable onPress={() => setQty((n) => n + 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyMark}>+</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => add(product, qty)}
          style={styles.add}
        >
          <Text style={styles.addText}>Add to bag</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  center: { alignItems: "center", justifyContent: "center" },
  missing: { fontFamily: fonts.serif, fontSize: 20, color: colors.ink },
  hero: { height: 420, backgroundColor: colors.paperWarm },
  image: { width: "100%", height: "100%" },
  back: {
    position: "absolute",
    left: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  backText: { fontFamily: fonts.serif, fontSize: 13, color: colors.ink },
  body: { padding: 22 },
  name: { fontFamily: fonts.serif, fontSize: 28, lineHeight: 34, color: colors.ink },
  tagline: { marginTop: 8, fontFamily: fonts.sans, color: colors.stone, fontSize: 13, letterSpacing: 0.4 },
  meta: { marginTop: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  price: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink },
  origin: { fontFamily: fonts.sans, fontSize: 12, color: colors.stone },
  rating: { marginTop: 8, color: colors.gold, fontSize: 13 },
  reviews: { color: colors.stone, fontFamily: fonts.sans },
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  qty: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  qtyBtn: { width: 40, height: 48, alignItems: "center", justifyContent: "center" },
  qtyMark: { fontSize: 20, color: colors.ink },
  qtyVal: { minWidth: 24, textAlign: "center", fontFamily: fonts.serif, fontSize: 18 },
  add: {
    flex: 1,
    backgroundColor: colors.crimson,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: colors.white,
    fontFamily: fonts.sans,
    letterSpacing: 1,
    fontSize: 12,
    textTransform: "uppercase",
  },
});
