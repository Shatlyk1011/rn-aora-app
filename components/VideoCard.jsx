import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white text-sm font-psemibold">{title}</Text>
            <Text className="text-xs text-gray-100 font-pregular">{username}</Text>
          </View>
          <View className="pt-2">
            <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
          </View>
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 roudned-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            // if the source = url use uri
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="cover" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
