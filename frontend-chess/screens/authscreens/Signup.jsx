import { View, Text, Button, Pressable } from "react-native";
import { router } from "expo-router";

export default function SignUp({ setSignUpPage, onSuccess }) {

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Sign Up Page</Text>
            <Pressable onPress={() => setSignUpPage(false)}><Text>Go to login</Text></Pressable>
            <Button onPress={() => onSuccess()} title="Sign up button"></Button>
        </View>

    );
}
