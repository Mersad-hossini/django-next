import React from "react";
import ForgetPassword from "@/components/templates/User/ForgetPassword/ForgetPassword";
import AuthGuard from "@/hocks/authGuard/authGuard";

function Forgetpassword() {
  return (
    <>
      <AuthGuard requireAuth={false}>
        <ForgetPassword />
      </AuthGuard>
    </>
  );
}

export default Forgetpassword;