import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { CartProvider } from "../context/CartContext";
import { Toast } from "../components/Toast";
import { colors } from "../theme";

export default function RootLayout() {
  return (
    <CartProvider>
      <View style={{ flex: 1, backgroundColor: colors.paper }}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.paper },
            animation: "fade",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" options={{ animation: "slide_from_right" }} />
          <Stack.Screen name="collection/[id]" options={{ animation: "slide_from_right" }} />
          <Stack.Screen name="checkout" options={{ animation: "slide_from_bottom", presentation: "modal" }} />
          <Stack.Screen name="search" options={{ animation: "fade", presentation: "modal" }} />
        </Stack>
        <Toast />
      </View>
    </CartProvider>
  );
}
