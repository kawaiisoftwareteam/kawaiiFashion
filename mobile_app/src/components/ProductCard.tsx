import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Product } from "../data/catalog";
import { formatPrice } from "../data/catalog";
import { colors, fonts, radius } from "../theme";

export function ProductCard({ product, wide }: { product: Product; wide?: boolean }) {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable style={StyleSheet.flatten([styles.card, wide && styles.wide])}>
        <View style={styles.imageWrap}>
          <Image source={product.image} style={styles.image} contentFit="cover" />
          {product.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.tagline}>{product.tagline}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.origin}>{product.origin}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  wide: {
    width: 176,
    flex: undefined,
    marginRight: 12,
  },
  imageWrap: {
    height: 148,
    borderRadius: radius.sm,
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
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: fonts.sans,
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
  row: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  price: {
    fontFamily: fonts.serif,
    fontSize: 16,
    color: colors.ink,
  },
  origin: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.stone,
    letterSpacing: 0.6,
  },
});
