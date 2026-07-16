
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import mockData from "../../data/doctors.json";
import { useState } from "react";
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

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const id = typeof params.id === "string" ? params.id : "";
  const doctor = (mockData.doctors as Doctor[]).find((d) => d.id === id) || (mockData.doctors[0] as Doctor);

  const [selectedDate, setSelectedDate] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string>("08:30 AM");


 
  const imageSource = DOCTOR_IMAGE_MAP[doctor.id] ? DOCTOR_IMAGE_MAP[doctor.id] : { uri: fallbackUrl };


  const handlePhoneCall = () => {
    const cleanPhone = doctor.phone.replace(/[^\d+]/g, "");
    Linking.canOpenURL(`tel:${cleanPhone}`)
      .then((supported) => {
        if (supported) {
          Linking.openURL(`tel:${cleanPhone}`);
        } else {
          Alert.alert("Error", "Phone calls are not supported on this device.");
        }
      })
      .catch(() => Alert.alert("Error", "Could not complete the phone dial operation."));
  };

  const handleOpenMapDirections = () => {
    const query = encodeURIComponent(doctor.address);
    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`
    });

    if (url) {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
        }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top", "left", "right"]}>

      <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Ionicons name="arrow-back" size={20} color="#4c3494" className="mr-1" />
          <Text className="text-base font-bold text-[#4c3494]">HealthBridge</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-5">
          <Ionicons name="swap-horizontal" size={24} color="#94a3b8" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        className="px-4"
        showsVerticalScrollIndicator={false}
      >



        <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-4">
          <View className="flex-row items-center mb-4">
            <View className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-100">
              <Image
                source={imageSource}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-slate-800">{doctor.name}</Text>

              <View className="flex-row items-center gap-1.5 mt-1.5">
                <View className="bg-purple-100 px-3 py-1 rounded-full">
                  <Text className="text-[#4c3494] text-xs font-bold uppercase">Primary Care</Text>
                </View>
                <View className="bg-slate-100 px-3 py-1 rounded-full">
                  <Text className="text-slate-600 text-xs font-bold uppercase">{doctor.experience}</Text>
                </View>
              </View>
            </View>
          </View>

          <Text className="text-slate-500 text-sm leading-relaxed mb-4">
            {doctor.about}
          </Text>

          <Text className="text-slate-400 font-bold text-xs tracking-wider uppercase mb-2">
            ACCEPTED INSURANCE
          </Text>
          <View className="flex-row flex-wrap gap-1.5">
            {doctor.insurance.map((ins, i) => (
              <View key={i} className="bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded-md">
                <Text className="text-emerald-700 text-xs font-bold uppercase">{ins}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text className="text-slate-800 font-bold text-base mb-3">Available Appointments</Text>

        <View className="flex-row gap-3 mb-4">
          {doctor.slots.dates.map((item, idx) => {
            const isDateSelected = selectedDate === idx;
            return (
              <View
                key={idx}
                className={`flex-1 p-3 rounded-2xl border ${isDateSelected ? "border-[#4c3494] bg-white" : "border-slate-100 bg-slate-50/50"
                  }`}
              >
                <View className="items-center pb-2 mb-2 border-b border-slate-100">
                  <Text className="text-sm text-slate-400 font-bold uppercase">{item.day}</Text>
                  <Text className="text-sm font-bold text-slate-700 mt-0.5">{item.date}</Text>
                </View>

                <View className="space-y-1.5">
                  {doctor.slots.times.slice(0, 3).map((time, timeIdx) => {
                    const isTimeSelected = isDateSelected && selectedTime === time;
                    return (
                      <TouchableOpacity
                        key={timeIdx}
                        onPress={() => {
                          setSelectedDate(idx);
                          setSelectedTime(time);
                        }}
                        activeOpacity={0.8}
                        className={`py-2 px-1.5 rounded-lg items-center justify-center ${isTimeSelected ? "bg-[#4c3494]" : "bg-slate-100"
                          }`}
                      >
                        <Text className={`text-sm font-bold ${isTimeSelected ? "text-white" : "text-slate-600"}`}>
                          {time}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>

        <View className="bg-purple-50 p-4 rounded-2xl flex-row items-center border border-purple-100 mb-4">
          <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
            <Ionicons name="call" size={18} color="#4c3494" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-700 font-bold text-sm">Prefer to book over the phone?</Text>
            <TouchableOpacity onPress={handlePhoneCall}>
              <Text className="text-slate-500 text-sm mt-0.5 leading-relaxed">
                Call Dr. Rao's Front Desk Directly at{" "}
                <Text className="text-[#4c3494] font-bold underline">{doctor.phone}</Text>
              </Text>
            </TouchableOpacity>
            <Text className="text-sm text-slate-400 mt-1">Open Mon-Fri, 8:00 AM - 5:00 PM EST</Text>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="location" size={16} color="#94a3b8" className="mr-1" />
            <Text className="text-slate-800 font-bold text-md">Office Location</Text>
          </View>
          <Text className="text-slate-500 text-xs leading-relaxed mb-3">
            {doctor.address}
          </Text>

          <View className="w-full h-36 bg-slate-100 rounded-2xl relative overflow-hidden border border-slate-100">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" }}
              className="w-full h-full opacity-90"
              resizeMode="cover"
            />

            <View className="absolute top-1/2 left-1/2 -mt-4 -ml-4 w-8 h-8 items-center justify-center">
              <Ionicons name="pin" size={28} color="#4c3494" />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleOpenMapDirections}
              className="absolute bottom-2 right-2 bg-[#4c3494] px-3.5 py-2 rounded-xl shadow-sm"
            >
              <Text className="text-white text-xs font-bold">Open Navigation</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm mb-4 space-y-3">
          <View className="flex-row items-center border-b border-slate-50 pb-2">
            <Ionicons name="shield-checkmark" size={18} color="#4c3494" className="mr-2" />
            <Text className="text-slate-800 font-bold text-sm">Verified Care</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#f59e0b" className="mr-1" />
              <Text className="text-slate-600 text-sm font-medium">4.9 / 5.0 Patient Rating</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="thumbs-up" size={14} color="#10b981" className="mr-1" />
              <Text className="text-slate-600 text-sm font-medium">98% Recommend</Text>
            </View>
          </View>

          <View className="border-t border-slate-100 pt-3 flex-row items-center">
            <Ionicons name="time" size={14} color="#94a3b8" className="mr-1" />
            <Text className="text-slate-500 text-sm font-medium">Low wait times (Avg 8 mins)</Text>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-4 pb-6 bg-white border-t border-slate-100 shadow-lg">
        <TouchableOpacity
          disabled={!selectedTime}
          onPress={() =>
            router.push({
              pathname: "/(main)/Confirmation",
              params: {
                id: doctor.id,
                time: selectedTime,
                date: `${doctor.slots.dates[selectedDate].day} ${doctor.slots.dates[selectedDate].date}`,
              },
            })
          }
          className={`w-full py-4 mb-6 rounded-xl items-center justify-center ${selectedTime ? "bg-[#4c3494]" : "bg-slate-300"
            }`}
        >
          <Text className="text-white font-bold text-md">
            {selectedTime ? "Confirm Appointment" : "Please Choose a Time Slot"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}