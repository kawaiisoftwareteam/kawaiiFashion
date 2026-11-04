import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/catalog";
import { colors, fonts, radius, shadows } from "../theme";

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
        <View style={styles.inputWrap}>
          <Ionicons name="search-outline" size={18} color={colors.stone} />
          <TextInput
            autoFocus
            value={query}
            onChangeText={setQuery}
            placeholder="Search serum, matcha, Fuji…"
            placeholderTextColor={colors.stone}
            style={styles.input}
            returnKeyType="search"
          />
          {query ? (
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={colors.stone} />
            </Pressable>
          ) : null}
        </View>
        <IconButton icon="close" label="Close" onPress={() => router.back()} size={48} />
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
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    ...shadows.soft,
  },
  input: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.ink,
  },
  grid: { padding: 16, paddingBottom: 40 },
  count: { fontFamily: fonts.sans, color: colors.stone, fontSize: 12, marginBottom: 12, letterSpacing: 0.6 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  item: { width: "48%", flexGrow: 1 },
});
