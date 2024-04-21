import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";

import { icons } from "../constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="flex border-2 h-16 border-black-200 w-fill px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center">
      <TextInput
        className="flex-1 text-base text-white h-full items-center font-pregular "
        value={query}
        placeholder="Search for a video topic"
        onChangeText={(e) => setQuery(e)}
        placeholderTextColor="#cdcde0"
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Plase input something to search results across database"
            );
          }

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
