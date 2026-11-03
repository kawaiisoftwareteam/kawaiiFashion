import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/catalog";
import { colors, fonts } from "../theme";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.origin.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <View style={styles.bar}>
        <TextInput
          autoFocus
          value={query}
          onChangeText={setQuery}
          placeholder="Search serum, matcha, Fuji…"
          placeholderTextColor={colors.stone}
          style={styles.input}
        />
        <Pressable onPress={() => router.back()}>
          <Text style={styles.cancel}>Close</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.grid} keyboardShouldPersistTaps="handled">
        <Text style={styles.count}>{query ? `${results.length} results` : "Popular now"}</Text>
        <View style={styles.wrap}>
          {results.map((product) => (
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
  screen: { flex: 1, backgroundColor: colors.paper },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.ink,
  },
  cancel: { fontFamily: fonts.serif, color: colors.stone, fontSize: 14 },
  grid: { padding: 16, paddingBottom: 40 },
  count: { fontFamily: fonts.sans, color: colors.stone, fontSize: 12, marginBottom: 12, letterSpacing: 0.6 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  item: { width: "48%", flexGrow: 1 },
});
