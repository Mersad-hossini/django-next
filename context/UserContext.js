import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const res = await fetch("https://api.mander.ir/user/auth/refresh", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.ok;
    } catch (err) {
      console.error("Error refreshing token:", err);
      return false;
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("https://api.mander.ir/user/user-profile", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    }
  };

  const storeTokens = async () => {
    await fetchUser(); // فعلاً فقط fetchUser صدا می‌زنه
  };

  useEffect(() => {
    const initAuth = async () => {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        await fetchUser();
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, storeTokens, fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);