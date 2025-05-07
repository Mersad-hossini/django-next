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
      setUser(null);
    }
  };

  const storeTokens = async (access, refresh) => {
    await fetchUser();
  };

  useEffect(() => {
    const initAuth = async () => {
      const refreshed = await refreshAccessToken(); // ← ارسال به /auth/refresh
      if (refreshed) {
        await fetchUser(); // ← گرفتن اطلاعات کاربر
      } else {
        setUser(null); // ← لاگ‌اوت یا ناشناس
      }
      setLoading(false);
    };
  
    initAuth(); // ← اجرای اولیه هنگام mount
  }, []);
  

  return (
    <UserContext value={{ user, setUser, loading, storeTokens }}>
      {children}
    </UserContext>
  );
};

export const useUser = () => useContext(UserContext);