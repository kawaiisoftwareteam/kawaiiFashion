import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductCard } from "../../components/ProductCard";
import { SectionHeader } from "../../components/SectionHeader";
import { collections, images, products } from "../../data/catalog";
import { colors, fonts, radius } from "../../theme";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const featured = products.slice(0, 4);
  const ritual = products.filter((item) =>
    ["serum", "cream", "cleanser", "mask"].includes(item.id)
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.promo, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.promoText}>Free shipping over $50</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.brand}>KAWAII BEAUTY</Text>
        <Pressable onPress={() => router.push("/search")} style={styles.searchBtn}>
          <Text style={styles.searchLabel}>Search</Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Image source={images.landscape} style={styles.heroImage} contentFit="cover" />
        <LinearGradient
          colors={["rgba(28,23,20,0.08)", "rgba(28,23,20,0.62)"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroCopy}>
          <Text style={styles.heroEyebrow}>Japanese living</Text>
          <Text style={styles.heroTitle}>Rituals of{"\n"}quiet luxury</Text>
          <Text style={styles.heroBody}>
            Skincare, Fuji waters, nama chocolate, and Tokyo beauty tech — curated from Japan.
          </Text>
          <Pressable onPress={() => router.push("/shop")} style={styles.heroCta}>
            <Text style={styles.heroCtaText}>Shop the collection</Text>
          </Pressable>
        </View>
      </View>

      <SectionHeader eyebrow="Browse" title="Shop by ritual" action="All" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cats}
      >
        {[
          { id: "serum", en: "Serums" },
          { id: "alkaline-water", en: "Waters" },
          { id: "chocolate", en: "Nama" },
          { id: "gadgets", en: "Tech" },
          { id: "moisturizer", en: "Creams" },
        ].map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => router.push({ pathname: "/shop", params: { category: cat.id } })}
            style={styles.cat}
          >
            <Text style={styles.catEn}>{cat.en}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <SectionHeader eyebrow="Picks" title="Editor’s selection" />
      <View style={styles.grid}>
        {featured.map((product) => (
          <View key={product.id} style={styles.gridItem}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>

      <SectionHeader eyebrow="Sets" title="Seasonal sets" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sets}
      >
        {collections.map((collection) => (
          <Link key={collection.id} href={`/collection/${collection.id}`} asChild>
            <Pressable style={styles.set}>
              <Image source={collection.image} style={styles.setImage} contentFit="cover" />
              <LinearGradient
                colors={["transparent", "rgba(28,23,20,0.78)"]}
                style={styles.setFade}
              />
              <View style={styles.setCopy}>
                <Text style={styles.setName}>{collection.name}</Text>
              </View>
            </Pressable>
          </Link>
        ))}
      </ScrollView>

      <View style={styles.story}>
        <Text style={styles.storyTitle}>Crafted with Japanese discipline</Text>
        <Text style={styles.storyBody}>
          From Niigata rice ferment and Oshima camellia to Uji matcha and Mt. Fuji spring water —
          each piece is chosen for quiet quality, not noise.
        </Text>
        <View style={styles.storyRow}>
          {["Niigata", "Kyoto", "Fuji", "Tokyo"].map((city) => (
            <View key={city} style={styles.city}>
              <Text style={styles.cityText}>{city}</Text>
            </View>
          ))}
        </View>
      </View>

      <SectionHeader eyebrow="Skincare" title="The morning ritual" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ritual}
      >
        {ritual.map((product) => (
          <ProductCard key={product.id} product={product} wide />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  promo: {
    backgroundColor: colors.crimson,
    alignItems: "center",
    paddingBottom: 10,
  },
  promoText: {
    color: colors.white,
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontFamily: fonts.sans,
    fontSize: 18,
    letterSpacing: 2.4,
    color: colors.ink,
  },
  searchBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  searchLabel: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: colors.ink,
  },
  hero: {
    marginHorizontal: 20,
    height: 420,
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: 32,
    backgroundColor: colors.paperWarm,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
  },
  heroCopy: {
    position: "absolute",
    left: 22,
    right: 22,
    bottom: 24,
  },
  heroEyebrow: {
    color: colors.goldSoft,
    fontFamily: fonts.serif,
    fontSize: 13,
    marginBottom: 8,
  },
  heroTitle: {
    color: colors.white,
    fontFamily: fonts.serif,
    fontSize: 36,
    lineHeight: 42,
  },
  heroBody: {
    marginTop: 10,
    color: "rgba(255,253,248,0.86)",
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 280,
  },
  heroCta: {
    marginTop: 16,
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  heroCtaText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: colors.ink,
  },
  cats: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 10,
  },
  cat: {
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 86,
    alignItems: "center",
  },
  catEn: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.stone,
    textTransform: "uppercase",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 32,
  },
  gridItem: {
    width: "48%",
    flexGrow: 1,
  },
  sets: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  set: {
    width: 220,
    height: 280,
    marginRight: 12,
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: colors.paperWarm,
  },
  setImage: {
    ...StyleSheet.absoluteFill,
  },
  setFade: {
    ...StyleSheet.absoluteFill,
  },
  setCopy: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
  setName: {
    color: colors.white,
    fontFamily: fonts.sans,
    fontSize: 18,
  },
  story: {
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 22,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  storyTitle: {
    fontFamily: fonts.serif,
    fontSize: 26,
    lineHeight: 32,
    color: colors.ink,
  },
  storyBody: {
    marginTop: 12,
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkSoft,
  },
  storyRow: {
    flexDirection: "row",
    marginTop: 18,
    gap: 8,
  },
  city: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  cityText: {
    fontFamily: fonts.serif,
    fontSize: 12,
    color: colors.ink,
  },
  ritual: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
});
