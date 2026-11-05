import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, type IconName } from "../components/Button";
import { colors, fonts, radius, shadows } from "../theme";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1100);
  };

  if (done) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <View style={styles.successSeal}>
          <Ionicons name="checkmark" size={36} color={colors.white} />
        </View>
        <Text style={styles.successTitle}>{"You're in"}</Text>
        <Text style={styles.successNote}>Welcome back to the atelier.</Text>
        <Button
          label="Continue"
          icon="arrow-forward"
          size="lg"
          fullWidth
          onPress={() => router.replace("/(tabs)/account")}
          style={styles.cta}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[colors.ink, "#2A211E", colors.ink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.heroTop}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={20} color={colors.white} />
          </Pressable>
          <Text style={styles.heroBrand}>KAWAII MART</Text>
          <View style={{ width: 42 }} />
        </View>
        <Text style={styles.heroEyebrow}>Member access</Text>
        <Text style={styles.heroTitle}>Welcome back</Text>
        <Text style={styles.heroSub}>Sign in for saved pieces and quiet order tracking.</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 28 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={16} color={colors.crimson} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Field
              label="Email"
              icon="mail-outline"
              placeholder="aiko@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Field
              label="Password"
              icon="lock-closed-outline"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
              trailing={
                <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={colors.stone}
                  />
                </Pressable>
              }
            />

            <Pressable style={styles.forgot} onPress={() => {}}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>

            <Button
              label={loading ? "Signing in…" : "Sign in"}
              icon="log-in-outline"
              size="lg"
              fullWidth
              loading={loading}
              onPress={onSubmit}
              style={styles.cta}
            />

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialRow}>
              <SocialBtn icon="logo-google" label="Google" />
              <SocialBtn icon="logo-apple" label="Apple" />
            </View>
          </View>

          <Text style={styles.switch}>
            New here?{" "}
            <Link href="/register" style={styles.switchLink}>
              Create account
            </Link>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
  trailing,
}: {
  label: string;
  icon: IconName;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "words" | "sentences";
  autoComplete?: "email" | "password" | "name" | "new-password";
  trailing?: ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={18} color={colors.stone} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.stone}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
        />
        {trailing}
      </View>
    </View>
  );
}

function SocialBtn({ icon, label }: { icon: IconName; label: string }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.socialBtn, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${label}`}
    >
      <Ionicons name={icon} size={18} color={colors.ink} />
      <Text style={styles.socialLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  flex: { flex: 1 },
  center: { alignItems: "center", justifyContent: "center", padding: 28 },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,253,248,0.12)",
  },
  heroBrand: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 2.4,
    color: colors.goldSoft,
  },
  heroEyebrow: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.gold,
    marginBottom: 6,
  },
  heroTitle: {
    fontFamily: fonts.serif,
    fontSize: 34,
    color: colors.white,
    marginBottom: 8,
  },
  heroSub: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(255,253,248,0.68)",
    maxWidth: 280,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    ...shadows.soft,
  },
  field: { marginBottom: 14 },
  label: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.stone,
    letterSpacing: 0.6,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 52,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: colors.paper,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  input: {
    flex: 1,
    fontFamily: fonts.sans,
    color: colors.ink,
    fontSize: 15,
  },
  forgot: { alignSelf: "flex-end", marginBottom: 4, marginTop: -4 },
  forgotText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: "600",
    color: colors.crimson,
  },
  cta: { marginTop: 10 },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 18,
  },
  line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.line },
  dividerText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.stone,
  },
  socialRow: { flexDirection: "row", gap: 10 },
  socialBtn: {
    flex: 1,
    height: 48,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  socialLabel: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: "600",
    color: colors.ink,
  },
  switch: {
    marginTop: 22,
    textAlign: "center",
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.stone,
  },
  switchLink: {
    color: colors.crimson,
    fontWeight: "700",
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.blush,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  errorText: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.crimson,
  },
  successSeal: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.crimson,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    ...shadows.glow,
  },
  successTitle: {
    fontFamily: fonts.serif,
    fontSize: 30,
    color: colors.ink,
    marginBottom: 8,
  },
  successNote: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.stone,
    marginBottom: 8,
    textAlign: "center",
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
});
