import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

import SignUp from "../screens/authscreens/Signup";
import SignIn from "../screens/authscreens/SignIn";

export default function Authentication() {

    const [signUpPage, setSignUpPage] = useState(true);


    //gets called if auth is successfull and takes user back to the page they pressed sign in from
    const onSuccess = () => {
        router.back()
    }
    
    //renders based on a state that is passed as a prop
    return signUpPage ? <SignUp setSignUpPage={setSignUpPage} onSuccess={onSuccess} /> : <SignIn setSignUpPage={setSignUpPage} onSuccess={onSuccess} />;
}
