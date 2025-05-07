import { useState } from "react";
import swal from "sweetalert";

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async (id) => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart/cart-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });

      const data = await res.json();      

      if (!res.ok) {
        setError(data.message || "Error adding to cart");
        swal({
          title: data.message || "Error adding to cart",
          icon: "error",
          button: "Ok",
        });
        setLoading(false);
        return;
      }

      swal({
        title: data.message || "Product successfully added to cart",
        icon: "success",
        button: "Ok",
      });
      setLoading(false);
    } catch (error) {
      setError("Something went wrong");
      swal({
        title: "Something went wrong",
        icon: "error",
        button: "Ok",
      });
      setLoading(false);
    }
  };

  return { addToCart, loading, error };
};

export default useAddToCart;
