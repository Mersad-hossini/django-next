import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
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

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch("https://api.mander.ir/order/order-detail/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        setOrder(null);
      }
    } catch (err) {
      console.error("Error fetching Order:", err);
      setOrder(null);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("https://api.mander.ir/user/user-profile", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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
    setLoading(true);
    await fetchUser();
    await fetchOrder();
    setLoading(false);
  };

  useEffect(() => {
    const initAuth = async () => {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        await fetchUser();
        await fetchOrder();
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        storeTokens,
        fetchUser,
        fetchOrder,
        order,
        setOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);