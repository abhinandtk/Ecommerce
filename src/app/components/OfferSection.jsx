'use client'
import { useEffect, useState } from "react";

export default function OfferSection() {
  const offers = [
    "SIGN UP TO OUR NEWSLETTER FOR 10% OFF",
    "FREE SHIPPING ON ORDERS OVER $50",
    "USE CODE WELCOME10 FOR EXTRA SAVINGS",
    "LIMITED TIME OFFER — SHOP NOW!",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className="
      w-full relative h-10 overflow-hidden
      bg-slate-200 dark:bg-slate-800
      text-blue-600 dark:text-blue-400
      text-sm font-medium tracking-wide
    ">
      {offers.map((offer, i) => {
        const isCurrent = i === index;
        const isPrev = i === (index - 1 + offers.length) % offers.length;
        
        // Base transition for moving elements
        const transitionClass = "transition-all duration-700 ease-in-out";
        
        // Determine state
        let stateClass = "opacity-0 translate-y-full"; // Default: Waiting (bottom) w/o transition (snap)
        
        if (isCurrent) {
          stateClass = `${transitionClass} opacity-100 translate-y-0`;
        } else if (isPrev) {
          stateClass = `${transitionClass} opacity-0 -translate-y-full`;
        }

        return (
          <div 
            key={i}
            className={`absolute inset-0 flex items-center justify-center w-full h-full ${stateClass}`}
          >
            {offer}
          </div>
        );
      })}
    </div>
  );
}