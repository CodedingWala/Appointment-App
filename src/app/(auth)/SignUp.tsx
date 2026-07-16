import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function SignUpScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password || !confirmPassword) {
      Alert.alert("Required Fields", "Please fill in all the input fields to create an account.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match. Please verify both fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Your password must contain at least 6 characters for safety.");
      return;
    }

    setIsLoading(true);

    try {
      await SecureStore.setItemAsync("saved_email", trimmedEmail);
      await SecureStore.setItemAsync("saved_password", password);
      await SecureStore.setItemAsync("user_seeded", "true");

      setIsLoading(false);

      Alert.alert(
        "Success!",
        "Account created successfully! You can now log in using your credentials.",
        [
          {
            text: "Login Now",
            onPress: () => router.replace("/(auth)/Login"),
          },
        ]
      );
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Registration Error", "Something went wrong while securing your credentials.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-50"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6 py-10">
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-[#4c3494] rounded-2xl items-center justify-center shadow-lg shadow-purple-200 mb-4">
                <Text className="text-white text-3xl font-black">H</Text>
              </View>
              <Text className="text-3xl font-extrabold text-[#4c3494] tracking-tight">
                Create Account
              </Text>
              <Text className="text-slate-500 mt-2 text-center text-sm px-6">
                Join HealthBridge today to instantly schedule and track your professional doctor appointments.
              </Text>
            </View>

            <View className="space-y-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <View>
                <Text className="text-slate-700 font-bold mb-2 text-xs tracking-wider uppercase">
                  Email Address
                </Text>
                <TextInput
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:border-[#4c3494]"
                  placeholder="name@example.com"
                  placeholderTextColor="#a0aec0"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View className="mt-4">
                <Text className="text-slate-700 font-bold mb-2 text-xs tracking-wider uppercase">
                  Password
                </Text>
                <TextInput
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:border-[#4c3494]"
                  placeholder="Minimum 6 characters"
                  placeholderTextColor="#a0aec0"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View className="mt-4">
                <Text className="text-slate-700 font-bold mb-2 text-xs tracking-wider uppercase">
                  Confirm Password
                </Text>
                <TextInput
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:border-[#4c3494]"
                  placeholder="Re-enter your password"
                  placeholderTextColor="#a0aec0"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <TouchableOpacity
                onPress={handleSignUp}
                activeOpacity={0.85}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl mt-6 items-center shadow-lg ${
                  isLoading ? "bg-slate-400" : "bg-[#4c3494] shadow-purple-100"
                }`}
              >
                <Text className="text-white font-bold text-base">
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>


            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-slate-500 text-sm">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)/Login")}>
                <Text className="text-[#4c3494] font-bold text-sm underline">
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}