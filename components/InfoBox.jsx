import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={`items-center ${containerStyles}`}>
      <Text className={`text-white font-psemibold ${titleStyles}`}>{title}</Text>
      <Text className="text-gray-100 font-pregular">{subtitle}</Text>
    </View>
  );
};

export default InfoBox;
