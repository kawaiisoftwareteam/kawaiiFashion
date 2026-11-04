import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "../../components/AppHeader";
import { Chip } from "../../components/Button";
import { ProductCard } from "../../components/ProductCard";
import { categories, products } from "../../data/catalog";
import { colors, fonts } from "../../theme";

export default function ShopScreen() {
  const insets = useSafeAreaInsets();
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
      <AppHeader eyebrow="Curated from Japan" title="The catalog" actions={["search", "bag"]} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pills}
        style={styles.pillsScroll}
      >
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            icon={category.id === "all" ? "sparkles-outline" : undefined}
            active={category.id === active}
            onPress={() => setActive(category.id)}
          />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        <View style={styles.toolbar}>
          <Text style={styles.count}>{filtered.length} selected pieces</Text>
          <View style={styles.sort}>
            <Ionicons name="swap-vertical" size={14} color={colors.ink} />
            <Text style={styles.sortText}>Featured</Text>
          </View>
        </View>
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
  pillsScroll: {
    flexGrow: 0,
  },
  pills: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 8,
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  count: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.stone,
    letterSpacing: 0.8,
  },
  sort: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sortText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.ink,
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
