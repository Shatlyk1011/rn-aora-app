import { View, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ title, value, handleChange, otherStyles, ...props }) => {
  return (
    <View className="flex border-2 border-black-200 w-fill px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center">
      <TextInput
        className="flex-1 text-base text-white h-full items-center font-pregular "
        value={value}
        placeholder="Search for a video topic"
        onChangeText={handleChange}
        placeholderTextColor="#7b7b8b"
        {...props}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
