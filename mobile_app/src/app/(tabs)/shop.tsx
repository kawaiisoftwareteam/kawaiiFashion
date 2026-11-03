import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductCard } from "../../components/ProductCard";
import { categories, products } from "../../data/catalog";
import { colors, fonts } from "../../theme";

export default function ShopScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const [active, setActive] = useState(params.category ?? "all");

  useEffect(() => {
    if (typeof params.category === "string" && params.category.length > 0) {
      setActive(params.category);
    }
  }, [params.category]);

  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((item) => item.category === active)),
    [active]
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>The catalog</Text>
        </View>
        <Pressable onPress={() => router.push("/search")}>
          <Text style={styles.search}>Search</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pills}
      >
        {categories.map((category) => {
          const on = category.id === active;
          return (
            <Pressable
              key={category.id}
              onPress={() => setActive(category.id)}
              style={[styles.pill, on && styles.pillOn]}
            >
              <Text style={[styles.pillEn, on && styles.pillEnOn]}>{category.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        <Text style={styles.count}>{filtered.length} selected pieces</Text>
        <View style={styles.wrap}>
          {filtered.map((product) => (
            <View key={product.id} style={styles.item}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.ink,
  },
  search: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.stone,
    letterSpacing: 0.6,
  },
  pills: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  pill: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  pillOn: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  pillEn: {
    fontFamily: fonts.sans,
    fontSize: 12,
    letterSpacing: 0.8,
    color: colors.ink,
  },
  pillEnOn: {
    color: colors.white,
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  count: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.stone,
    marginBottom: 12,
    letterSpacing: 0.8,
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    width: "48%",
    flexGrow: 1,
  },
});
