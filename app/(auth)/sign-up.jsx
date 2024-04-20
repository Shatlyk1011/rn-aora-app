import { useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";

import { Link, router } from "expo-router";

import { createUser } from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert("Error1", "Please fill all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.userName);
      //set "result" to global state...

      router.replace("/home");
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6 ">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px] " />
          <Text className="text-2xl text-white mt-10 font-psemibold">Sign up to Auro</Text>
          <FormField
            title="Username"
            value={form.userName}
            handleChange={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt-8"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChange={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-8"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-8"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-8"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?{" "}
              <Link className="text-lg font-psemibold text-secondary" href="/sign-in">
                Login
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
