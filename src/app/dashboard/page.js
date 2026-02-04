import React from "react";
import Header from "../components/Header";
import Link from "next/link";
import SignoutHandle from "./components/SignoutHandle";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-serif mb-12 tracking-tight">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-3">
            <ul className="space-y-1">
              {[
                { name: "Overview", href: "#overview", active: true },
                { name: "Orders & Returns", href: "#orders", active: false },
                { name: "Wishlist", href: "#wishlist", active: false },
                { name: "Addresses", href: "#addresses", active: false },
                { name: "Account Settings", href: "#settings", active: false },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block py-3 px-4 -ml-4 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-6 mt-6 border-t border-gray-100">
                <SignoutHandle />
              </li>
            </ul>
          </nav>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-10">
            {/* 1. Profile Summary (Top of Hierarchy) */}
            <section className="flex items-center gap-6 pb-8 border-b border-gray-100">
              <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative">
                <img
                  src="https://api.dicebear.com/9.x/avataaars/svg?seed=Abhinav"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-gray-900">
                  Abhinav Chhimwal
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  abhinav@example.com
                </p>
                <div className="flex gap-4 mt-3">
                  <button className="text-xs font-semibold uppercase tracking-wider underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-all">
                    Edit Profile
                  </button>
                </div>
              </div>
            </section>

            {/* 2. Active Order (Priority Action) */}
            <section>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-lg font-serif">Active Order</h3>
                <Link
                  href="#"
                  className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900"
                >
                  View All Orders
                </Link>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between bg-white hover:border-gray-300 transition-colors">
                <div className="flex gap-6 items-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-md border border-gray-100 flex items-center justify-center text-2xl relative overflow-hidden">
                    <img
                      src="/image/banner1.webp"
                      alt="Product"
                      className="object-cover w-full h-full opacity-90"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-sm font-medium text-green-700">
                        In Transit
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium text-lg mb-1">
                      Arriving by Friday, Feb 6
                    </p>
                    <p className="text-sm text-gray-500">
                      Order #ORD-7782 • 3 Items
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col gap-2">
                  <button className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-black transition-colors w-full md:w-auto">
                    Track Package
                  </button>
                  <button className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors w-full md:w-auto">
                    View Details
                  </button>
                </div>
              </div>
            </section>

            {/* 3. Quick Actions / Account Overview */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Wishlist */}
              <Link href="#wishlist" className="group block">
                <div className="border border-gray-200 rounded-lg p-6 h-full hover:border-gray-400 transition-all">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-2xl">♡</span>
                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                      5 Items
                    </span>
                  </div>
                  <h4 className="font-serif text-lg mb-1 group-hover:underline decoration-1 underline-offset-4">
                    Wishlist
                  </h4>
                  <p className="text-sm text-gray-500">
                    Save your favorites for later.
                  </p>
                </div>
              </Link>

              {/* Addresses */}
              <Link href="#addresses" className="group block">
                <div className="border border-gray-200 rounded-lg p-6 h-full hover:border-gray-400 transition-all">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-2xl">📍</span>
                  </div>
                  <h4 className="font-serif text-lg mb-1 group-hover:underline decoration-1 underline-offset-4">
                    Addresses
                  </h4>
                  <p className="text-sm text-gray-500">
                    Manage shipping & billing details.
                  </p>
                </div>
              </Link>

              {/* Login & Security */}
              <Link href="#security" className="group block">
                <div className="border border-gray-200 rounded-lg p-6 h-full hover:border-gray-400 transition-all">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h4 className="font-serif text-lg mb-1 group-hover:underline decoration-1 underline-offset-4">
                    Login & Security
                  </h4>
                  <p className="text-sm text-gray-500">
                    Update password and account access.
                  </p>
                </div>
              </Link>
            </section>

            {/* 4. Subtle Recommendation (Secondary) */}
            <section className="pt-8 border-t border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
                Recommended for you
              </h3>
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100/50">
                <div className="w-16 h-16 bg-white rounded flex items-center justify-center text-xl shrink-0 border border-gray-100">
                  💧
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    Hyaluronic Acid 2% + B5
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Based on your recent purchase of "Natural Moisturizing
                    Factors"
                  </p>
                </div>
                <button className="text-sm font-medium underline underline-offset-4 hover:text-gray-600 px-4">
                  Add to Bag - $8.90
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
