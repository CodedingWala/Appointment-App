import React, { useState, useEffect } from "react";
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
import mockData from "./../../data/doctors.json";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function seedMockUser() {
      try {
        const hasSeeded = await SecureStore.getItemAsync("user_seeded");
        if (!hasSeeded) {
          await SecureStore.setItemAsync("saved_email", "admin@healthbridge.com");
          await SecureStore.setItemAsync("saved_password", "SecurePass123");
          await SecureStore.setItemAsync("user_seeded", "true");
        }
      } catch (error) {
        console.log("SecureStore seeding failed: ", error);
      }
    }
    seedMockUser();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Required Fields", "Please fill in both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const validJsonUser = mockData.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
      );

      if (validJsonUser) {
        setIsLoading(false);
        router.replace("/(main)/Home");
        return;
      }

      const secureEmail = await SecureStore.getItemAsync("saved_email");
      const securePassword = await SecureStore.getItemAsync("saved_password");

      if (
        secureEmail &&
        securePassword &&
        secureEmail.toLowerCase() === email.toLowerCase().trim() &&
        securePassword === password
      ) {
        setIsLoading(false);
        router.replace("/(main)/Home")
        return;
      }

      setIsLoading(false);
      Alert.alert(
        "Login Failed",
        "The email or password you entered is incorrect. Please check and try again."
      );

    } catch (error) {
      setIsLoading(false);
      Alert.alert("System Error", "Unable to securely verify credentials at this time.");
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
            <View className="items-center mb-10">
              <View className="w-16 h-16 bg-[#4c3494] rounded-2xl items-center justify-center shadow-lg shadow-purple-200 mb-4">
                <Text className="text-white text-3xl font-black">H</Text>
              </View>
              <Text className="text-3xl font-extrabold text-[#4c3494] tracking-tight">
                HealthBridge
              </Text>
              <Text className="text-slate-500 mt-2 text-center text-sm px-6">
                Your secure gateway to elite doctor consultations and appointment scheduling.
              </Text>
            </View>

            <View className="space-y-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <View>
                <Text className="text-slate-700 font-bold mb-2 text-xs tracking-wider uppercase">
                  Email / Username
                </Text>
                <TextInput
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:border-[#4c3494]"
                  placeholder="user@healthbridge.com"
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
                  placeholder="••••••••"
                  placeholderTextColor="#a0aec0"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.85}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl mt-6 items-center shadow-lg ${
                  isLoading ? "bg-slate-400" : "bg-[#4c3494] shadow-purple-100"
                }`}
              >
                <Text className="text-white font-bold text-base">
                  {isLoading ? "Verifying..." : "Log In"}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-8 bg-purple-50 border border-purple-100 rounded-2xl p-4">
              <Text className="text-[#4c3494] font-bold text-xs uppercase tracking-wide">
                Reviewer Credentials:
              </Text>
              <Text className="text-slate-600 text-xs mt-1 font-medium">
                • JSON option: <Text className="font-bold">user@healthbridge.com</Text> / Password123
              </Text>
              <Text className="text-slate-600 text-xs mt-1 font-medium">
                • SecureStore backup: <Text className="font-bold">admin@healthbridge.com</Text> / SecurePass123
              </Text>
            </View>

            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-slate-500 text-sm">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/SignUp")}>
                <Text className="text-[#4c3494] font-bold text-sm underline">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}