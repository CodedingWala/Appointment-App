import React from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Switch 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import mockData from "../../data/doctors.json";
import { DOCTOR_IMAGE_MAP, fallbackUrl } from "@/constants/paths";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance: string;
  networkStatus: string;
  nextSlot: string;
  experience: string;
  about: string;
  insurance: string[];
  slots: {
    dates: { day: string; date: string }[];
    times: string[];
  };
  phone: string;
  address: string;
}

export default function ConfirmationScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const id = typeof params.id === "string" ? params.id : "";
  const selectedTime = typeof params.time === "string" ? params.time : "10:30 AM";
  const selectedDate = typeof params.date === "string" ? params.date : "Friday June 19, 2025";

  const doctor = (mockData.doctors as Doctor[]).find((d) => d.id === id) || (mockData.doctors[0] as Doctor);

  const [syncCalendar, setSyncCalendar] = React.useState(true);
  const [turnOffSms, setTurnOffSms] = React.useState(false);


  const imageSource = DOCTOR_IMAGE_MAP[doctor.id]?  DOCTOR_IMAGE_MAP[doctor.id] : {uri:fallbackUrl} ;

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top", "left", "right"]}>
      
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">
        <View className="flex-row items-center">
          <View className="w-9 h-9 rounded-full bg-slate-800 items-center justify-center mr-3">
            <Ionicons name="apps" size={20} color="white" />
          </View>
          <Text className="text-xl font-bold text-[#4c3494]">HealthBridge</Text>
        </View>
        <Ionicons name="swap-horizontal" size={24} color="#4c3494" />
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120 }} 
        className="px-5" 
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center my-6">
          <View className="w-16 h-16 bg-amber-500 rounded-full items-center justify-center mb-4 shadow-sm">
            <Ionicons name="checkmark" size={32} color="white" />
          </View>
          <Text className="text-2xl font-black text-slate-800 tracking-tight">Booking Confirmed</Text>
          <Text className="text-slate-500 text-sm mt-1.5 text-center px-4 leading-relaxed">
            Your appointment has been successfully scheduled.
          </Text>
        </View>

        <View className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-5">
          <View className="flex-row items-center justify-between border-b border-slate-100 pb-5 mb-5">
            <View>
              <Text className="text-[#4c3494] font-black text-xs uppercase tracking-widest mb-1">
                PHYSICIAN
              </Text>
              <Text className="text-lg font-black text-slate-800 leading-snug">
                {doctor.name}
              </Text>
              <Text className="text-slate-500 text-sm mt-0.5">
                {doctor.specialty || "Internal Medicine"}
              </Text>
            </View>

            <View className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-100">
              <Image 
                source={imageSource}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>

          <View className="flex-row items-start mb-5">
            <View className="w-12 h-12 bg-purple-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="calendar" size={24} color="#4c3494" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 font-extrabold text-xs uppercase tracking-wider">
                DATE & TIME
              </Text>
              <Text className="text-base font-bold text-slate-800 mt-1">
                {selectedDate}
              </Text>
              <Text className="text-slate-500 text-sm mt-0.5">
                {selectedTime} EST
              </Text>
            </View>
          </View>

          <View className="flex-row items-start border-b border-dashed border-slate-200 pb-5 mb-5">
            <View className="w-12 h-12 bg-purple-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="location" size={24} color="#4c3494" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 font-extrabold text-xs uppercase tracking-wider">
                LOCATION
              </Text>
              <Text className="text-base font-bold text-slate-800 mt-1">
                HealthBridge Medical Center
              </Text>
              <Text className="text-slate-500 text-sm mt-0.5 leading-relaxed">
                {doctor.address}
              </Text>
            </View>
          </View>

          <View className="space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-slate-500 text-sm">Consultation Fee</Text>
              <Text className="text-slate-700 font-semibold text-sm">$240.00</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-slate-500 text-sm">Insurance Coverage</Text>
              <Text className="text-emerald-600 font-semibold text-sm">-$240.00</Text>
            </View>
            <View className="border-t border-slate-100 pt-3 flex-row justify-between items-center">
              <Text className="text-slate-800 font-bold text-base">Total Due</Text>
              <View className="items-end">
                <Text className="text-2xl font-black text-[#4c3494]">$0.00</Text>
                <View className="bg-emerald-100 px-2 py-0.5 rounded mt-1">
                  <Text className="text-emerald-700 text-[10px] font-black uppercase">FULLY COVERED</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="items-center justify-center mt-6 pt-2 border-t border-dashed border-slate-200">
            <Text className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
              CONFIRMATION ID: HB-992-04X
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-5 space-y-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-700 font-semibold text-sm flex-1 mr-4">
              Automatically sync to my Google Calendar
            </Text>
            <Switch 
              value={syncCalendar} 
              onValueChange={setSyncCalendar} 
              trackColor={{ false: "#cbd5e1", true: "#4c3494" }}
            />
          </View>
          
          <View className="border-t border-slate-100 pt-4 flex-row items-center justify-between">
            <Text className="text-slate-700 font-semibold text-sm flex-1 mr-4">
              Turn off duplicate SMS alerts
            </Text>
            <Switch 
              value={turnOffSms} 
              onValueChange={setTurnOffSms} 
              trackColor={{ false: "#cbd5e1", true: "#4c3494" }}
            />
          </View>
        </View>
        <TouchableOpacity className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-4">
            <Ionicons name="chatbubble-ellipses" size={24} color="#4c3494" className="mr-3" />
            <Text className="text-slate-600 text-sm leading-relaxed flex-1">
              Send appointment receipt details to family or caregiver via text message
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.replace("/(main)/Home")} 
          className="w-full bg-[#4c3494] py-4 rounded-2xl items-center justify-center shadow-lg"
        >
          <Text className="text-white font-extrabold text-base">Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}