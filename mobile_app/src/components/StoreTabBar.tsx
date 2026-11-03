import { StyleSheet, Text, Pressable, View } from "react-native";
import { useCart } from "../context/CartContext";
import { colors, fonts } from "../theme";

type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigateToTab: (routeKey: string) => void;
  insets: { bottom: number };
};

const LABELS: Record<string, string> = {
  index: "Home",
  shop: "Shop",
  cart: "Bag",
  account: "Member",
};

export function StoreTabBar({ state, navigateToTab, insets }: TabBarProps) {
  const { count } = useCart();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.line} />
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const label = LABELS[route.name] ?? route.name;
          return (
            <Pressable
              key={route.key}
              onPress={() => navigateToTab(route.key)}
              style={styles.item}
            >
              <Text style={[styles.label, focused && styles.labelOn]}>{label}</Text>
              {route.name === "cart" && count > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{count}</Text>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.white,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
  },
  row: {
    flexDirection: "row",
    paddingTop: 10,
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: colors.stone,
  },
  labelOn: {
    color: colors.crimson,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: "28%",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.crimson,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontFamily: fonts.sans,
  },
});
