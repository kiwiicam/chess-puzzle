import { View, Text, Button, Pressable } from "react-native";
import { router } from "expo-router";

export default function SignIn({ setSignUpPage, onSuccess }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Sign In Page</Text>
            <Pressable onPress={() => setSignUpPage(true)}><Text>Go to signup</Text></Pressable>
            <Button onPress={() => onSuccess()} title="Sign in button"></Button>
        </View>
    );
}
