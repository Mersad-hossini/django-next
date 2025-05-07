import CartBox from "@/components/modules/CartBox/CartBox";
import Footer from "@/components/modules/Footer/Footer";
import PublicNavbar from "@/components/modules/PublicNavbar/PublicNavbar";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

function CartLayout() {
  const [cartItems, setCartItems] = useState([]);
  const [conditionCheck, setConditionCheck] = useState(false);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCartProducts = async () => {
    try {
      const res = await fetch("/api/cart/cart-product");
      if (res.ok) {
        const cartData = await res.json();
        setCartItems(cartData.data?.items || []);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const paymentGateway = (e) => {
    if (conditionCheck) {
      e.preventDefault();
      swal({
        title: "Payment Gateway",
        icon: "success",
        buttons: "Ok",
      });
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="grow mt-8 md:mt-16">
        {cartItems.length > 0 ? (
          <div className="container mx-auto px-4">
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Cart */}
              <div className="md:col-span-8 space-y-4">
                {cartItems.map((cartItem) => (
                  <CartBox
                    key={cartItem._id}
                    {...cartItem}
                    onRemove={(productId) =>
                      setCartItems((prev) =>
                        prev.filter((item) => item.product._id !== productId)
                      )
                    }
                  />
                ))}
              </div>

              {/* Payment Info */}
              <aside className="md:col-span-4 space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white">
                    <svg className="w-6 h-6">
                      <use href="#credit-card" />
                    </svg>
                    <span className="font-semibold">Payment</span>
                  </div>
                  <div className="p-4 space-y-4 text-sm text-gray-700 dark:text-white">
                    {/* Price Info */}
                    <div className="space-y-2 border-b border-gray-200 dark:border-gray-600 pb-4">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span>{totalAmount} $</span>
                      </div>
                      <div className="flex justify-between text-red-500">
                        <span>Discount</span>
                        <span>0</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-base font-semibold">
                      <span>Final</span>
                      <span>{totalAmount} $</span>
                    </div>

                    {/* Terms + Button */}
                    <form className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          required
                          className="accent-green-500"
                          value={conditionCheck}
                          onChange={(e) => setConditionCheck(e.target.checked)}
                        />
                        <span>I agree to the terms and conditions.</span>
                      </label>
                      <button
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
                        onClick={paymentGateway}
                      >
                        Complete Order
                      </button>
                    </form>
                  </div>
                </div>
              </aside>
            </section>
          </div>
        ) : (
          <div
            className="bg-red-100 border text-center border-orange-400 mt-10 text-orange-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">Shopping cart is empty</span>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default CartLayout;
