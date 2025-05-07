import SignUpDetails from "@/components/templates/User/SignUpDetails/SignUpDetails";
import { checkIfLoggedIn } from "@/utils/auth/checkIfLoggedIn";
import Head from "next/head";
import React from "react";

function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignUpDetails />
    </>
  );
}

export const getServerSideProps = async (context) => {
  console.log(context);
  
  return checkIfLoggedIn(context);
};

export default SignUp;