import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { useThemeColor } from "../hooks/use-theme-color";
import { useAuth } from "./contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn } = useAuth();
  const textColor = useThemeColor({}, "text");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await signIn(email.trim(), password);
      router.replace("/");
    } catch (err) {
      console.error(err);
      setError(
        "Unable to sign in. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.formWrapper}>
          <ThemedText type="title">Sign In</ThemedText>
          <View style={styles.form}>
            <ThemedText>Email</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholderTextColor={textColor}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />

            <ThemedText>Password</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholderTextColor={textColor}
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />

            {error ? (
              <ThemedText type="defaultBold" style={styles.error}>
                {error}
              </ThemedText>
            ) : null}

            <Pressable
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              <ThemedText type="button">
                {loading ? "Signing in..." : "Sign In"}
              </ThemedText>
            </Pressable>

            <Link href="/forgot-password" style={styles.link}>
              <ThemedText>Forgot password?</ThemedText>
            </Link>

            <View style={styles.bottomRow}>
              <ThemedText>Don&apos;t have an account?</ThemedText>
              <Link href="/signup" style={styles.linkInline}>
                <ThemedText type="button">Sign Up</ThemedText>
              </Link>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formWrapper: {
    padding: 24,
  },
  form: {
    marginTop: 24,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3478f6",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  link: {
    marginTop: 12,
  },
  bottomRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  linkInline: {
    paddingHorizontal: 4,
  },
  error: {
    color: "#cc3c3c",
  },
});
