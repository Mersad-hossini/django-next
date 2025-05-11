import React from "react";
import ForgetPassword from "@/components/templates/User/ForgetPassword/ForgetPassword";
import AuthGuard from "@/hocks/authGuard/authGuard";
import Head from "next/head";

function Forgetpassword() {
  return (
    <>
      <Head>
        <title>forget password</title>
      </Head>
      <AuthGuard requireAuth={false}>
        <ForgetPassword />
      </AuthGuard>
    </>
  );
}

export default Forgetpassword;