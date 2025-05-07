import React from "react";
import ForgetPassword from "@/components/templates/User/ForgetPassword/ForgetPassword"
import { checkIfLoggedIn } from "@/utils/auth/checkIfLoggedIn";

function Forgetpassword() {
  return (
    <>
      <ForgetPassword />
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   return checkIfLoggedIn(context);
// };

export default Forgetpassword;
