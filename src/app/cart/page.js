import React from "react";
import Header from "../components/Header";
import CartContainer from "./components/CartContainer";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans selection:bg-stone-100">
      <Header />
      <CartContainer />
    </main>
  );
}
