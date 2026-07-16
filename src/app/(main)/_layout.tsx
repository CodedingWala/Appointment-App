import React from 'react';
import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false, 
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "#f8fafc" }
      }}
    >
      <Stack.Screen name="Home" />
      <Stack.Screen name="Details" />
      <Stack.Screen name="Confirmation" />
    </Stack>
  );
}