import React from "react";
import Link from "next/link";
import { auth } from "../../../auth";

export default async function Header() {
  const session = await auth();
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "#pricing" },
    { name: "Privacy and terms", href: "#privacy" },
    { 
      name: session ? "Dashboard" : "Login", 
      href: session ? "/dashboard" : "/login" 
    },
    { 
      name: session ? "Cart" : "Login", 
      href: session ? "/cart" : "/login" 
    },
  ];

  return (
    <header className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto bg-white/70 dark:bg-black/70 backdrop-blur-xl rounded-full px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20 dark:border-white/10">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="
                  block px-5 py-2  text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-white/10 rounded-full transition-all duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
