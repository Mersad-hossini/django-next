import React from "react";
import ResetPassword from "@/components/templates/User/ResetPassword/ResetPassword";
import { useRouter } from "next/router";
import AuthGuard from "@/hocks/authGuard/authGuard";
import Head from "next/head";

function ResetPasswordPage() {
  const router = useRouter();
  const { code: resetPasswordCode } = router.query;

  if (!router.isReady) return null;

  if (!resetPasswordCode) {
    router.replace("/user/forget-password");
    return null;
  }

  return (
    <>
      <Head>
        <title>reset password</title>
      </Head>
      <AuthGuard requireAuth={false}>
        <ResetPassword resetCode={resetPasswordCode} />
      </AuthGuard>
    </>
  );
}

export default ResetPasswordPage;