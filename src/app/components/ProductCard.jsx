'use client'
import Image from "next/image";
import { useState } from "react";

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

export default ProductCard