"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FetchCart, UpdateCartItem, RemoveCartItem } from "@/lib/api";

export default function CartContainer() {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.backendAccessToken) {
      loadCart();
    }
  }, [session]);

  const loadCart = async () => {
    try {
      const data = await FetchCart(session.backendAccessToken);
      console.log("Cart data fetched:", data);
      setCartData(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    
    try {
      const updatedCart = await UpdateCartItem(
        { item_id: itemId, quantity: newQty },
        session.backendAccessToken
      );
      console.log("Cart updated:", updatedCart);
      setCartData(updatedCart);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = await RemoveCartItem(
        { item_id: itemId },
        session.backendAccessToken
      );
      console.log("Item removed, new cart:", updatedCart);
      setCartData(updatedCart);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <p className="text-xl text-stone-400 font-serif">Loading your bag...</p>
      </div>
    );
  }

  const items = cartData?.items || [];
  const subtotal = parseFloat(cartData?.total_price || 0);
  const shipping = items.length > 0 ? 10.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-3xl md:text-4xl font-serif mb-12 tracking-tight">
        Shopping Bag
      </h1>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-stone-100"
                >
                  {/* Item Image */}
                  <div className="relative w-full sm:w-40 aspect-[3/4] bg-stone-50 overflow-hidden rounded-sm border border-stone-100 shrink-0">
                    <Image
                      src={item.product_image || "/image/banner1.webp"}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-stone-900 mb-1">
                          {item.product_name}
                        </h3>
                        <div className="flex gap-4 text-sm text-stone-500">
                          <p>Color: {item.product_variant.colors.name}</p>
                          <p>Size: {item.product_variant.sizes.name}</p>
                        </div>
                      </div>
                      <p className="text-lg font-medium">
                        ${(parseFloat(item.product_variant.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-stone-200 rounded-sm overflow-hidden">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                          className="px-3 py-1 hover:bg-stone-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-sm font-medium border-x border-stone-200 min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                          className="px-3 py-1 hover:bg-stone-50 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-xs font-semibold uppercase tracking-widest text-stone-400 hover:text-stone-900 underline underline-offset-4 decoration-stone-200 hover:decoration-stone-900 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Shop */}
            <Link
              href="/"
              className="inline-flex items-center mt-12 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors group"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-1 mr-2">
                ←
              </span>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-stone-50 p-8 rounded-sm border border-stone-100 sticky top-32">
              <h2 className="text-xl font-serif mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8 text-stone-600">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-stone-200 flex justify-between font-semibold text-stone-900 text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-stone-900 text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-black transition-all rounded-sm shadow-sm hover:shadow-md">
                Proceed to Checkout
              </button>

              <p className="mt-6 text-[11px] text-stone-400 text-center uppercase tracking-widest flex items-center justify-center gap-2">
                <span>🔒</span> Secure Checkout • Free Returns
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center border-t border-stone-100">
          <p className="text-xl text-stone-400 mb-8 font-serif">Your bag is currently empty.</p>
          <Link
            href="/"
            className="inline-block px-10 py-4 bg-stone-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors rounded-sm shadow-sm"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
