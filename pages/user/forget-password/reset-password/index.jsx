import React from "react";
import ResetPassword from "@/components/templates/User/ResetPassword/ResetPassword";

function ResetPasswordPage({ resetPasswordCode }) {
  return (
    <>
      <ResetPassword resetCode={resetPasswordCode} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { code } = context.query;

  if (!code) {
    return {
      redirect: {
        destination: "/user/forget-password",
        permanent: false,
      },
    };
  }

  return {
    props: {
      resetPasswordCode: code,
    },
  };
};

export default ResetPasswordPage;