'use client';
import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Gentle Cleansing Gel",
    price: "$38.00",
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "BESTSELLER",
    variants: {
      colors: [
        { name: "Original", value: "#e5e7eb" },
        { name: "Rose", value: "#fca5a5" },
        { name: "Charcoal", value: "#4b5563" }
      ],
      sizes: ["50ml", "100ml"]
    }
  },
  {
    id: 2,
    name: "Hydrating Face Serum",
    price: "$62.00",
    image: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "NEW",
    variants: {
      colors: [
        { name: "Clear", value: "#ffffff" },
        { name: "Gold", value: "#fcd34d" }
      ],
      sizes: ["30ml", "50ml"]
    }
  },
  {
    id: 3,
    name: "Daily Moisturizer",
    price: "$45.00",
    image: "https://images.pexels.com/photos/3618606/pexels-photo-3618606.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: null,
    variants: {
      colors: [
        { name: "Cream", value: "#fef3c7" },
        { name: "Light", value: "#f3f4f6" }
      ],
      sizes: ["50ml", "100ml", "200ml"]
    }
  },
  {
    id: 4,
    name: "Exfoliating Mask",
    price: "$50.00",
    image: "https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "TRENDING",
    variants: {
      colors: [
        { name: "Green", value: "#86efac" },
        { name: "Clay", value: "#d6d3d1" }
      ],
      sizes: ["75ml", "125ml"]
    }
  },
  {
    id: 5,
    name: "Brightening Eye Cream",
    price: "$55.00",
    image: "https://images.pexels.com/photos/3616764/pexels-photo-3616764.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "NEW",
    variants: {
      colors: [
        { name: "Default", value: "#fff7ed" }
      ],
      sizes: ["15ml"]
    }
  },
  {
    id: 6,
    name: "Retinol Night Serum",
    price: "$75.00",
    image: "https://images.pexels.com/photos/3762882/pexels-photo-3762882.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "PREMIUM",
    variants: {
      colors: [
        { name: "Dark", value: "#1e293b" },
        { name: "Amber", value: "#d97706" }
      ],
      sizes: ["30ml"]
    }
  },
  {
    id: 7,
    name: "Vitamin C Booster",
    price: "$48.00",
    image: "https://images.pexels.com/photos/3617175/pexels-photo-3617175.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "POPULAR",
    variants: {
      colors: [
        { name: "Orange", value: "#fb923c" }
      ],
      sizes: ["20ml", "40ml"]
    }
  },
  {
    id: 8,
    name: "Soothing Face Oil",
    price: "$58.00",
    image: "https://images.pexels.com/photos/4046416/pexels-photo-4046416.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: null,
    variants: {
      colors: [
        { name: "Clear", value: "#fdfcfb" },
        { name: "Herbal", value: "#ecfccb" }
      ],
      sizes: ["30ml", "60ml"]
    }
  }
];

export default function TrendingNow() {
  return (
    <section className="w-full py-16 px-4 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-center mb-10 text-stone-900 dark:text-stone-100 uppercase tracking-widest">
          Trending Now
        </h2>
        
        {/* Scrollable Container */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar">
          {products.map((product) => (
            <div key={product.id} className="min-w-70 md:min-w-[320px] lg:min-w-[calc(25%-18px)] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[0]);

  return (
    <div 
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 bg-white/90 dark:bg-stone-800/90 text-[10px] font-bold px-2 py-1 uppercase tracking-wider text-stone-900 dark:text-stone-100 z-10">
            {product.badge}
          </span>
        )}

        {/* Quick Add Button (Visible on Hover) */}
        <div 
          className={`
            absolute bottom-0 left-0 w-full 
            transform transition-all duration-300 ease-in-out
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
          `}
        >
          <button className="w-full bg-stone-900 text-white dark:bg-white dark:text-stone-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 dark:hover:bg-stone-200">
            Add to Bag - {selectedSize}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col items-start space-y-3">
        <div className="space-y-1 w-full">
          <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 tracking-wide">
            {product.name}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {product.price}
          </p>
        </div>

        {/* Variant 1: Colors */}
        <div className="flex items-center space-x-2">
          {product.variants.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 rounded-full border border-stone-200 dark:border-stone-700 focus:outline-none transition-all ${
                selectedColor.name === color.name 
                  ? 'ring-2 ring-stone-900 dark:ring-stone-100 ring-offset-1 dark:ring-offset-stone-950 scale-110' 
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>

        {/* Variant 2: Sizes */}
        <div className="flex flex-wrap gap-2">
          {product.variants.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`text-[10px] px-2 py-1 border transition-colors ${
                selectedSize === size
                  ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                  : 'border-stone-300 text-stone-600 hover:border-stone-900 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-100'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
