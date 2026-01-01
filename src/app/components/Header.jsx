import React from "react";

export default function Header() {
  return (
    <header className="
      w-full 
      bg-transparent 
      text-black dark:text-white
      hover:bg-black hover:text-white
      dark:hover:bg-white dark:hover:text-black
      transition-colors 
      duration-300
    ">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <ul className="flex items-center justify-center gap-8">
          {["Home", "About", "Contact", "Journal"].map((item) => (
            <li
              key={item}
              className="
                px-4 py-2 
                cursor-pointer 
                rounded-md
                transition-colors
                duration-300
                hover:bg-white/10
              "
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
