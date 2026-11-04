import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/catalog";
import { formatPrice } from "../data/catalog";
import { colors, fonts, radius, shadows } from "../theme";
import { IconButton } from "./Button";

export function ProductCard({ product, wide }: { product: Product; wide?: boolean }) {
  const { add } = useCart();
  const [saved, setSaved] = useState(false);

  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable
        style={({ pressed }) =>
          StyleSheet.flatten([styles.card, wide && styles.wide, pressed && styles.pressed])
        }
      >
        <View style={styles.imageWrap}>
          <Image source={product.image} style={styles.image} contentFit="cover" />
          {product.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          ) : null}
          <IconButton
            icon="heart-outline"
            activeIcon="heart"
            active={saved}
            label={saved ? "Remove from saved" : "Save"}
            variant="glass"
            size={32}
            onPress={() => setSaved((v) => !v)}
            style={styles.heart}
          />
        </View>
        <Text style={styles.tagline}>{product.tagline}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={11} color={colors.gold} />
          <Text style={styles.ratingText}>
            {product.rating.toFixed(1)} · {product.origin}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <IconButton
            icon="add"
            label="Add to bag"
            variant="dark"
            size={32}
            onPress={() => add(product, 1)}
          />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    ...shadows.soft,
  },
  wide: {
    width: 176,
    flex: undefined,
    marginRight: 12,
  },
  pressed: { transform: [{ scale: 0.98 }] },
  imageWrap: {
    height: 148,
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: colors.paperWarm,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    left: 8,
    top: 8,
    backgroundColor: colors.ink,
    borderRadius: radius.full,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  heart: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  tagline: {
    fontFamily: fonts.serif,
    color: colors.gold,
    fontSize: 11,
    marginBottom: 3,
  },
  name: {
    fontFamily: fonts.sans,
    color: colors.ink,
    fontSize: 13,
    lineHeight: 18,
    minHeight: 36,
  },
  rating: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.stone,
    letterSpacing: 0.4,
  },
  row: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontFamily: fonts.serif,
    fontSize: 16,
    color: colors.ink,
  },
});
