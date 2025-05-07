import React from "react";
import ResetPassword from "@/components/templates/User/ResetPassword/ResetPassword";
import CheckIfLoggedIn from "@/utils/auth/checkIfLoggedIn";
import { useRouter } from "next/router";

function ResetPasswordPage() {
  const router = useRouter();
  const { code: resetPasswordCode } = router.query;

  // تا زمانی که query هنوز آماده نیست، هیچ چیزی نمایش نده
  if (!router.isReady) return null;

  if (!resetPasswordCode) {
    router.replace("/user/forget-password");
    return null;
  }

  return (
    <CheckIfLoggedIn redirectTo="/my-account">
      <ResetPassword resetCode={resetPasswordCode} />
    </CheckIfLoggedIn>
  );
}

export default ResetPasswordPage;