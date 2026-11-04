import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "../../components/AppHeader";
import { ProductCard } from "../../components/ProductCard";
import { getCollection, products } from "../../data/catalog";
import { colors, fonts } from "../../theme";

export default function CollectionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const collection = getCollection(id);
  const insets = useSafeAreaInsets();

  if (!collection) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top + 24 }]}>
        <Text style={styles.missing}>Collection not found</Text>
      </View>
    );
  }

  const items = products.filter((item) => collection.productIds.includes(item.id));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.hero}>
        <Image source={collection.image} style={styles.heroImage} contentFit="cover" />
        <LinearGradient colors={["transparent", "rgba(28,23,20,0.78)"]} style={StyleSheet.absoluteFill} />
        <AppHeader back overlay topInset={insets.top} actions={["search", "bag"]} />
        <View style={styles.heroCopy}>
          <Text style={styles.title}>{collection.name}</Text>
          <Text style={styles.sub}>{collection.subtitle}</Text>
        </View>
      </View>
      <View style={styles.grid}>
        {items.map((product) => (
          <View key={product.id} style={styles.item}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  missing: { fontFamily: fonts.serif, fontSize: 20, color: colors.ink, textAlign: "center" },
  hero: { height: 320, backgroundColor: colors.paperWarm },
  heroImage: { ...StyleSheet.absoluteFill },
  heroCopy: { position: "absolute", left: 20, right: 20, bottom: 22 },
  title: { color: colors.white, fontFamily: fonts.serif, fontSize: 32 },
  sub: { marginTop: 6, color: "rgba(255,253,248,0.82)", fontFamily: fonts.sans, fontSize: 13 },
  grid: { flexDirection: "row", flexWrap: "wrap", padding: 16, gap: 10 },
  item: { width: "48%", flexGrow: 1 },
});
