import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import {styled} from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 p-5 bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="/(auth)/sign-in" className="mt-4 text-primary bg-primary/10 px-4 py-2 rounded">
        Sign In
      </Link>
      <Link href="/(auth)/sign-up" className="mt-2 text-primary bg-primary/10 px-4 py-2 rounded">
        Sign Up
      </Link>
    </SafeAreaView>
  );
}