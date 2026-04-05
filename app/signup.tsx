import { Link, useRouter } from "expo-router";
import { useState } from "react";
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

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const textColor = useThemeColor({}, "text");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");
    setLoading(true);

    try {
      await signUp(email.trim(), password);
      router.replace("/");
    } catch (err) {
      console.error(err);
      setError("Unable to create an account. Please try again.");
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
          <ThemedText type="title">Sign Up</ThemedText>
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
              onPress={handleSignUp}
              disabled={loading}
            >
              <ThemedText type="button">
                {loading ? "Creating account..." : "Create Account"}
              </ThemedText>
            </Pressable>

            <View style={styles.bottomRow}>
              <ThemedText>Already have an account?</ThemedText>
              <Link href="/login" style={styles.linkInline}>
                <ThemedText type="button">Sign In</ThemedText>
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
