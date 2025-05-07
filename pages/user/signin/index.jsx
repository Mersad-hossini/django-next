import SignInDetails from "@/components/templates/User/SignInDetails/SignInDetails";
import React from "react";

function SignIn() {
  
  return (
    <>
      <SignInDetails />
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   return checkIfLoggedIn(context);
// };

export default SignIn;