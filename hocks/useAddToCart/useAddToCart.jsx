import { useUser } from "@/context/UserContext";
import { useState } from "react";
import swal from "sweetalert";

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const addToCart = async (id) => {
    if (!user) {
      swal({
        title: "Please log in first",
        icon: "warning",
        button: "OK",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://api.mander.ir/order/order-detail/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 1, product: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to add to cart");
      }

      swal({
        title: "Added to cart!",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      swal({
        title: "Something went wrong",
        text: error.message,
        icon: "error",
        button: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading };
};

export default useAddToCart;