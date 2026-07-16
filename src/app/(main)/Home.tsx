import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Image, ImageSourcePropType } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
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



export default function HomeScreen() {
  const router = useRouter();


  const [filterInNetwork, setFilterInNetwork] = useState(false);
  const [filterNearest, setFilterNearest] = useState(false);

  const filteredDoctors = (mockData.doctors as Doctor[]).filter((doc) => {
    if (filterInNetwork && doc.networkStatus !== "In-Network") {
      return false;
    }
    if (filterNearest) {
      const distanceNum = parseFloat(doc.distance);
      if (isNaN(distanceNum) || distanceNum > 2.0) {
        return false;
      }
    }
    return true;
  });

  const renderDoctorCard = ({ item }: { item: Doctor }) => {
    const isInNetwork = item.networkStatus === "In-Network";

    const imageSource = DOCTOR_IMAGE_MAP[item.id] ? DOCTOR_IMAGE_MAP[item.id] : { uri: fallbackUrl };

    return (
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/(main)/Details", params: { id: item.id } })} className="bg-white rounded-3xl p-5 mb-5 border border-slate-100 shadow-sm">
        <View className="flex-row items-center">


          <View className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-100 mr-4">
            <Image
              source={imageSource}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text className="text-lg font-black text-slate-800 flex-1 pr-2 leading-snug" numberOfLines={1}>
                {item.name}
              </Text>


              <View className={`px-3 py-1 rounded-full ${isInNetwork ? 'bg-emerald-50 border border-emerald-100' : 'bg-amber-50 border border-amber-100'}`}>
                <Text className={`text-xs font-bold uppercase tracking-wider ${isInNetwork ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {item.networkStatus}
                </Text>
              </View>
            </View>
            <Text className="text-sm font-semibold text-slate-500 mt-1">{item.specialty}</Text>
          </View>
        </View>

        <View className="flex-row items-center mt-4">
          <Ionicons name="star" size={16} color="#fbbf24" className="mr-1.5" />
          <Text className="text-slate-700 font-extrabold text-sm mr-3">{item.rating}</Text>
          <Text className="text-slate-300 text-sm mr-3">|</Text>
          <Ionicons name="location-outline" size={16} color="#94a3b8" className="mr-1.5" />
          <Text className="text-slate-500 font-bold text-sm">{item.distance}</Text>
        </View>

        <View className="bg-purple-50/60 rounded-2xl p-4 mt-4 border border-purple-50/40">
          <Text className="text-xs text-[#4c3494] font-black tracking-widest uppercase mb-1">
            NEXT AVAILABLE TIME SLOT
          </Text>
          <Text className="text-slate-700 text-sm font-bold">
            {item.nextSlot}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push({ pathname: "/(main)/Details", params: { id: item.id } })}
          className="mt-4 flex-row items-center justify-end"
          activeOpacity={0.7}
        >
          <Text className="text-[#4c3494] font-black text-sm mr-1">View Profile & Book</Text>
          <Ionicons name="chevron-forward" size={16} color="#4c3494" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 pb-3" edges={['top', 'left', 'right']}>
      <View className="flex-1 px-5 pt-2">

        <View className="flex-row justify-between items-center mb-5">
          <View className="flex-row items-center">
            <View className="w-9 h-9 rounded-xl bg-[#4c3494] items-center justify-center mr-3">
              <Ionicons name="medical" size={20} color="white" />
            </View>
            <Text className="text-xl font-black text-slate-800 tracking-tight">HealthBridge</Text>
          </View>
          <View className="flex-row items-center gap-5">
            <Ionicons name="swap-horizontal" size={24} color="#94a3b8" />
          </View>
        </View>


        <View className="flex-row items-center gap-3 mb-5">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setFilterInNetwork(!filterInNetwork)}
            className={`px-5 py-3 rounded-full border ${filterInNetwork
                ? "bg-[#4c3494] border-[#4c3494]"
                : "bg-white border-slate-200"
              }`}
          >
            <View className="flex-row items-center">
              {filterInNetwork && <Ionicons name="checkmark" size={16} color="white" className="mr-1.5" />}
              <Text className={`text-sm font-bold ${filterInNetwork ? "text-white" : "text-slate-600"}`}>
                In-Network
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setFilterNearest(!filterNearest)}
            className={`px-5 py-3 rounded-full border ${filterNearest
                ? "bg-[#4c3494] border-[#4c3494]"
                : "bg-white border-slate-200"
              }`}
          >
            <View className="flex-row items-center">
              <Ionicons name="location" size={16} color={filterNearest ? "white" : "#4c3494"} className="mr-1.5" />
              <Text className={`text-sm font-bold ${filterNearest ? "text-white" : "text-slate-600"}`}>
                Nearest to Me
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        <Text className="text-sm text-slate-400 mb-4 font-black uppercase tracking-wider">
          {filteredDoctors.length} Specialists Available Nearby
        </Text>

        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id}
          renderItem={renderDoctorCard}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center py-16">
              <Ionicons name="alert-circle-outline" size={48} color="#94a3b8" className="mb-2" />
              <Text className="text-slate-400 font-bold text-base">No specialists match your filters.</Text>
            </View>
          }
          ListFooterComponent={
            <View className="bg-[#4c3494] rounded-3xl p-6 my-4 shadow-md shadow-purple-100">
              <Text className="text-purple-200 text-xs font-black tracking-widest uppercase">Quick Care</Text>
              <Text className="text-white text-xl font-black mt-1">Urgent Care Wait Times</Text>
              <Text className="text-purple-100/90 text-sm mt-2 leading-relaxed">
                Nearby urgent care facility at Westside Health Center has an estimated wait time of 15 mins.
              </Text>
              <TouchableOpacity className="bg-white rounded-2xl py-3 px-5 mt-5 self-start flex-row items-center" activeOpacity={0.9}>
                <Ionicons name="navigate" size={14} color="#4c3494" className="mr-1.5" />
                <Text className="text-[#4c3494] font-black text-sm">Get Directions</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}