import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import { colors, fonts, radius, shadows } from "../theme";
import { Badge, type IconName } from "./Button";

type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigateToTab: (routeKey: string) => void;
  insets: { bottom: number };
};

const TABS: Record<string, { label: string; icon: IconName; iconOn: IconName }> = {
  index: { label: "Home", icon: "home-outline", iconOn: "home" },
  shop: { label: "Shop", icon: "grid-outline", iconOn: "grid" },
  cart: { label: "Bag", icon: "bag-handle-outline", iconOn: "bag-handle" },
  account: { label: "Member", icon: "person-outline", iconOn: "person" },
};

export function StoreTabBar({ state, navigateToTab, insets }: TabBarProps) {
  const { count } = useCart();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const tab = TABS[route.name] ?? { label: route.name, icon: "ellipse-outline", iconOn: "ellipse" };
          return (
            <Pressable
              key={route.key}
              onPress={() => navigateToTab(route.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={tab.label}
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            >
              <View style={[styles.pill, focused && styles.pillOn]}>
                <View>
                  <Ionicons
                    name={focused ? tab.iconOn : tab.icon}
                    size={21}
                    color={focused ? colors.white : colors.stone}
                  />
                  {route.name === "cart" && count > 0 ? <Badge value={count} /> : null}
                </View>
                {focused ? <Text style={styles.label}>{tab.label}</Text> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.paper,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    height: 64,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    ...shadows.lifted,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  pressed: { opacity: 0.7 },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 46,
    paddingHorizontal: 14,
    borderRadius: radius.full,
  },
  pillOn: {
    backgroundColor: colors.ink,
  },
  label: {
    color: colors.white,
    fontFamily: fonts.sans,
    fontWeight: "600",
    fontSize: 11,
    letterSpacing: 0.8,
  },
});
