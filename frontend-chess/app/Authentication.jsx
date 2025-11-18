import { useState } from "react";
import { router } from "expo-router";

import SignUp from "../screens/authscreens/Signup";
import Login from "../screens/authscreens/Login";
import VerifyCode from "../screens/authscreens/VerifyCode";

export default function Authentication() {
  const [showSignUp, setShowSignUp] = useState(true);
  const [showVerify, setShowVerify] = useState(false);
  const [tempEmail, setTempEmail] = useState("");

  // When login is successful
  const onSuccessLogin = () => {
    router.back();
  };


  const onSignUpSuccess = (email) => {
    setTempEmail(email);
    setShowSignUp(false);
    setShowVerify(true);
  };


  const onVerified = () => {
    setShowVerify(false);
    setShowSignUp(false);
  };

  return (
    <>
      {showVerify ? (
        <VerifyCode
          email={tempEmail}
          onVerified={onVerified}
          goBack={() => {
            setShowVerify(false);
            setShowSignUp(true);
          }}
        />
      ) : showSignUp ? (
        <SignUp setSignUpPage={setShowSignUp} onSuccess={onSignUpSuccess} />
      ) : (
        <Login setSignUpPage={setShowSignUp} onSuccess={onSuccessLogin} />
      )}
    </>
  );
}
