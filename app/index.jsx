import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red-100">
      <Text className="text-4xl">Aora</Text>
      <StatusBar style="auto" />
      <Link href={"/profile"} style={{ color: "blue" }}>
        Go to profile
      </Link>
    </View>
  );
}
