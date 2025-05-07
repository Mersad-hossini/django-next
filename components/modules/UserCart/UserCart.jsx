import React, { useRef, useEffect, useState, useCallback } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Link from "next/link";

function UserCart({ isShopingCartOpen, onClose }) {
  const cartRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart/cart-product");
      if (res.ok) {
        const cartData = await res.json();
        const items = cartData.data?.items || [];
        setCartItems(items);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isShopingCartOpen) {
      fetchCartProducts();
    }
  }, [isShopingCartOpen, fetchCartProducts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    if (isShopingCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShopingCartOpen, onClose]);

  useEffect(() => {
    const handleCartChanged = () => fetchCartProducts();
    window.addEventListener("cart-changed", handleCartChanged);

    return () => {
      window.removeEventListener("cart-changed", handleCartChanged);
    };
  }, [fetchCartProducts]);

  const totalAmount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    : 0;

  return (
    <div
      ref={cartRef}
      className={`absolute ms:left-0 -left-22 top-full pt-4 z-10 transition-all mt-2 ${
        isShopingCartOpen ? "block" : "hidden"
      }`}
      id="cart-dropdown"
    >
      <div className="w-80 xs:w-[362px] bg-white dark:bg-darker rounded-lg">
        <div className="flex items-center justify-between px-5 py-4 bg-sky-50 dark:bg-sky-500/10 text-sky-500 mb-5 rounded-t-2xl">
          <span className="font-danaBold">My shopping cart</span>
          <span className="font-danaDemiBold text-slate-500">
            {cartItems.length} product{cartItems.length > 1 ? "s" : ""}
          </span>
        </div>
        <div className="cart-body pl-5 pr-2.5 mr-2.5 space-y-4 max-h-62 overflow-y-auto direction-ltr child:direction-rtl">
          {loading ? (
            <div className="text-center mb-4">
              <span className="font-danaMedium text-slate-500 dark:text-gray-400 block pb-5 text-center">
                Loading...
              </span>
            </div>
          ) : cartItems.length > 0 ? (
            cartItems.map((cartItem) => (
              <ProductItem
                key={cartItem._id}
                {...cartItem}
                onRemove={(productId) => {
                  setCartItems((prev) =>
                    prev.filter((i) => i.product._id !== productId)
                  );
                }}
              />
            ))
          ) : (
            <div className="text-center mb-4">
              <span className="font-danaMedium text-slate-500 dark:text-gray-400 block pb-5 text-center">
                Your shopping cart is empty. :(
              </span>
            </div>
          )}
        </div>
        {totalAmount > 0 && (
          <div className="mt-5 px-5 pb-5">
            <div className="flex items-center text-white justify-between border-t border-neutral-200 dark:border-white/10 pt-4 mb-5">
              <span>Amount payable:</span>
              <div className="flex items-center gap-x-1">
                <span className="text-lg font-danaDemiBold">
                  {totalAmount.toLocaleString()}{" "}
                  <span className="font-danaMedium text-base">$</span>
                </span>
              </div>
            </div>
            <div className="w-full">
              <Link
                href="/cart"
                className="w-full inline-block text-center bg-green-500 hover:bg-green-600 transition-colors text-white rounded-md p-2"
              >
                View shopping cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCart;
