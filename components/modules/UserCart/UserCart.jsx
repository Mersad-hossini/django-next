import React, { useRef, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { useUser } from "@/context/UserContext";

function UserCart({ isShopingCartOpen, onClose }) {
  const cartRef = useRef(null);
  const { order, fetchOrder, loading } = useUser(); // assume loading is provided from context

  useEffect(() => {
    if (isShopingCartOpen) {
      fetchOrder(); // Fetch order when cart opens
    }
  }, [isShopingCartOpen, fetchOrder]);

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
    const handleCartChanged = () => fetchOrder();
    window.addEventListener("cart-changed", handleCartChanged);

    return () => {
      window.removeEventListener("cart-changed", handleCartChanged);
    };
  }, [fetchOrder]);

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
            {order?.length || 0} product{(order?.length || 0) > 1 ? "s" : ""}
          </span>
        </div>
        <div className="cart-body pl-5 pr-2.5 mr-2.5 space-y-4 max-h-62 overflow-y-auto direction-ltr child:direction-rtl">
          {loading ? (
            <div className="text-center mb-4">
              <span className="font-danaMedium text-slate-500 dark:text-gray-400 block pb-5 text-center">
                Loading...
              </span>
            </div>
          ) : Array.isArray(order) && order.length > 0 ? (
            order.map((cartItem) => (
              <ProductItem
                key={cartItem.id}
                {...cartItem}
                onRemove={(productId) => {
                  fetchOrder(); // بازخوانی بعد از حذف
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
      </div>
    </div>
  );
}

export default UserCart;
