import { Link } from "expo-router";
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

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const textColor = useThemeColor({}, "text");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await resetPassword(email.trim());
      setMessage("If that email exists, a password reset link has been sent.");
    } catch (err) {
      console.error(err);
      setError(
        "Unable to send reset instructions. Please verify your email and try again.",
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
          <ThemedText type="title">Forgot Password</ThemedText>
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

            {message ? (
              <ThemedText style={styles.message}>{message}</ThemedText>
            ) : null}
            {error ? (
              <ThemedText type="defaultBold" style={styles.error}>
                {error}
              </ThemedText>
            ) : null}

            <Pressable
              style={styles.button}
              onPress={handleReset}
              disabled={loading}
            >
              <ThemedText type="button">
                {loading ? "Sending..." : "Send Reset Link"}
              </ThemedText>
            </Pressable>

            <Link href="/login" style={styles.link}>
              <ThemedText>Back to Sign In</ThemedText>
            </Link>
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
  error: {
    color: "#cc3c3c",
  },
  message: {
    color: "#2d8f2d",
  },
});
