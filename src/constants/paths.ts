import { ImageSourcePropType } from "react-native";

export const DOCTOR_IMAGE_MAP: Record<string, ImageSourcePropType> = {
  "1": require("../../assets/images/Anjali.jpg"), 
  "2": require("../../assets/images/Marcus.jpg"),
  "3": require("../../assets/images/Elena.jpg"),  
  "4": require("../../assets/images/James.jpg"),  
  "5": require("../../assets/images/Sarah.jpg"),  
};


export  const fallbackUrl = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80";