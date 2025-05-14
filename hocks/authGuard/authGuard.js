import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import DualSpinner from "@/components/modules/DualSpinner/DualSpinner";

export default function AuthGuard({
  children,
  requireAuth = false,
  allowedRoles = [],
}) {
  const { user, loading } = useUser();
  const router = useRouter();
  const path = router.pathname;

  if (loading) {
    return <DualSpinner />;
  }

  const guestOnlyRoutes = [
    "/user/signin",
    "/user/signup",
    "/user/forget-password",
    "/user/forget-password/reset-password",
    "/user/[activate]",
  ];

  const isGuestOnly = guestOnlyRoutes.includes(path);

  if (!requireAuth && user && isGuestOnly) {
    router.push("/my-account");
    return null;
  }

  if (requireAuth && !user) {
    router.push("/user/signin");
    return null;
  }

  // بررسی نقش کاربر
  if (
    requireAuth &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    router.push("/403");
    return null;
  }

  return children;
}
