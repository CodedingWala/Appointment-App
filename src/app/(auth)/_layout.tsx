import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import * as SecureStore from "expo-secure-store";
import { useRouter } from 'expo-router';

const _layout = () => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    const checkLogin = async () => {
      setisLoading(true)
      const secureEmail = await SecureStore.getItemAsync("saved_email");
      const securePassword = await SecureStore.getItemAsync("saved_password");
      setisLoading(false)
      if (secureEmail && securePassword) {
        router.replace("/(main)/Home")
      }
    }
    checkLogin()
  }, [])

  if(isLoading){
    <ActivityIndicator size={"large"} color={"blue"}/>
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0D0D0F" } }}>
      <Stack.Screen name="Login" options={{ animation: "fade" }} />
      <Stack.Screen name="SignUp" options={{ animation: "fade" }} />
    </Stack>
  )
}

export default _layout