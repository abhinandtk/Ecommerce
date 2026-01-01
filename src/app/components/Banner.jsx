'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";

export default function Banner() {
  const slides = [
    {
      id: 1,
      subtitle: "New Collection",
      title: "Nordic Skincare \nFor Sensitive Skin",
      description: "Dermatologist-tested formulas made with Nordic extracts and clinically proven actives. Gentle, effective, and designed for you.",
      image: "/image/banner1.webp",
      alt: "Nordic skincare bottles on a stone surface"
    },
    {
      id: 2,
      subtitle: "Gentle & Effective",
      title: "Results-Driven \nFormulas",
      description: "Experience the power of nature combined with science. Soothe and strengthen your skin barrier.",
      image: "/image/banner2.webp",
      alt: "Cream texture close up"
    },
    {
      id: 3,
      subtitle: "Daily Rituals",
      title: "Refresh. \nRebalance. Repeat.",
      description: "Simple, effective routines for healthy, glowing skin every day.",
      image: "/image/banner1.webp",
      alt: "Woman enjoying skincare ritual"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-stone-100 dark:bg-stone-900">
      {/* Slides Container */}
      <div 
        className="flex w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className="w-full h-full shrink-0 relative flex items-center justify-center"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0} // Load first image immediately
                  sizes="100vw"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
              <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] mb-4 uppercase drop-shadow-md">
                {slide.subtitle}
              </h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight whitespace-pre-line drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
                {slide.description}
              </p>
              <button className="
                bg-white text-stone-900
                hover:bg-stone-100 
                dark:bg-white dark:text-stone-900
                dark:hover:bg-stone-200
                px-10 py-4 
                text-sm font-bold tracking-widest uppercase 
                transition-all duration-300
                shadow-lg
              ">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm ${ 
              currentSlide === index 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
