import React from "react";
import ForgetPassword from "@/components/templates/User/ForgetPassword/ForgetPassword";
import CheckIfLoggedIn from "@/utils/auth/checkIfLoggedIn";

function Forgetpassword() {
  return (
    <>
      <CheckIfLoggedIn redirectTo="/my-account">
        <ForgetPassword />
      </CheckIfLoggedIn>
    </>
  );
}

export default Forgetpassword;