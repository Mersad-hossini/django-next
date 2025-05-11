import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";

export default function AuthGuard({
  children,
  requireAuth = false,
  allowedRoles = [],
}) {
  const { user, loading } = useUser();
  const router = useRouter();
  const path = router.pathname;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
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