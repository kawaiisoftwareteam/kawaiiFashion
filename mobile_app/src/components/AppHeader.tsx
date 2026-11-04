import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import { colors, fonts } from "../theme";
import { IconButton } from "./Button";

type Action = "search" | "bag" | "heart" | "close";

type AppHeaderProps = {
  title?: string;
  eyebrow?: string;
  brand?: boolean;
  back?: boolean;
  actions?: Action[];
  overlay?: boolean;
  topInset?: number;
};

export function AppHeader({
  title,
  eyebrow,
  brand,
  back,
  actions = [],
  overlay,
  topInset = 0,
}: AppHeaderProps) {
  const router = useRouter();
  const { count } = useCart();
  const variant = overlay ? "glass" : "light";

  return (
    <View style={[styles.wrap, overlay && styles.overlay, { paddingTop: topInset + 8 }]}>
      <View style={styles.side}>
        {back ? (
          <IconButton icon="chevron-back" label="Back" variant={variant} onPress={() => router.back()} />
        ) : null}
        {brand ? (
          <View>
            <Text style={styles.brand}>KAWAII</Text>
            <Text style={styles.brandSub}>BEAUTY · TOKYO</Text>
          </View>
        ) : null}
        {title ? (
          <View style={styles.titleWrap}>
            {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.actions}>
        {actions.map((action) => {
          switch (action) {
            case "search":
              return (
                <IconButton
                  key={action}
                  icon="search-outline"
                  label="Search"
                  variant={variant}
                  onPress={() => router.push("/search")}
                />
              );
            case "heart":
              return <IconButton key={action} icon="heart-outline" label="Saved" variant={variant} />;
            case "bag":
              return (
                <IconButton
                  key={action}
                  icon="bag-handle-outline"
                  label="Bag"
                  variant={variant}
                  badge={count}
                  onPress={() => router.push("/cart")}
                />
              );
            case "close":
              return (
                <IconButton
                  key={action}
                  icon="close"
                  label="Close"
                  variant={variant}
                  onPress={() => router.back()}
                />
              );
          }
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10,
  },
  side: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brand: {
    fontFamily: fonts.serif,
    fontSize: 22,
    letterSpacing: 4,
    color: colors.ink,
  },
  brandSub: {
    marginTop: 2,
    fontFamily: fonts.sans,
    fontSize: 9,
    letterSpacing: 2.4,
    color: colors.gold,
  },
  titleWrap: { flex: 1 },
  eyebrow: {
    fontFamily: fonts.serif,
    color: colors.gold,
    fontSize: 12,
    marginBottom: 2,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.ink,
  },
});
