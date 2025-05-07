// components/CheckIfLoggedIn.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CheckIfLoggedIn({
  redirectTo = "/my-account",
  children,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("https://api.mander.ir/user/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok && data.id) {
          router.push(redirectTo);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error.message);
        setIsLoading(false);
      }
    };

    checkLogin();
  }, [router, redirectTo]);

  if (isLoading) {
    return <div>در حال بررسی...</div>;
  }

  return children;
}