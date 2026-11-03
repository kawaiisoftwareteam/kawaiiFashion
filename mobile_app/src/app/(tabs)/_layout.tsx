import { Tabs } from "expo-router";
import { StoreTabBar } from "../../components/StoreTabBar";
import { colors } from "../../theme";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <StoreTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.paper },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="shop" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}
