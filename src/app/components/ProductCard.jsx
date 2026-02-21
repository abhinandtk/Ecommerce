'use client';

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

function ProductCard({ product }) {
  const activeVariants = useMemo(
    () => (product?.variants || []).filter(v => v.is_active),
    [product]
  );

  // Build unique colors and sizes from variants
  const colors = useMemo(() => {
    const map = new Map();
    for (const v of activeVariants) map.set(v.colors.id, v.colors);
    return Array.from(map.values());
  }, [activeVariants]);
  console.log(colors,'checkcolours')

  const sizes = useMemo(() => {
    const map = new Map();
    for (const v of activeVariants) map.set(v.sizes.id, v.sizes);
    return Array.from(map.values());
  }, [activeVariants]);

  // Initial selection (first available)
  const [selectedColorId, setSelectedColorId] = useState(colors?.[0]?.id);
  const [selectedSizeId, setSelectedSizeId] = useState(sizes?.[0]?.id);

  // If product changes, reset defaults safely
  useEffect(() => {
    setSelectedColorId(colors?.[0]?.id);
    setSelectedSizeId(sizes?.[0]?.id);
  }, [product?.id]); // reset when a new product card renders

  // Find selected variant
  const selectedVariant = useMemo(() => {
    if (!selectedColorId || !selectedSizeId) return null;
    return activeVariants.find(
      v => v.colors.id === selectedColorId && v.sizes.id === selectedSizeId
    ) || null;
  }, [activeVariants, selectedColorId, selectedSizeId]);
  console.log(selectedVariant,selectedColorId,'hcedsjkl')

  // If that exact combo doesn’t exist, pick first valid size for the selected color
  useEffect(() => {
    if (!selectedColorId || !selectedSizeId) return;
    if (selectedVariant) return;

    const fallback = activeVariants.find(v => v.colors.id === selectedColorId);
    if (fallback) setSelectedSizeId(fallback.sizes.id);
  }, [selectedColorId, selectedSizeId, selectedVariant, activeVariants]);

  // Helper: check if a size is available for currently selected color
  const isSizeAvailable = (sizeId) =>
    activeVariants.some(v => v.colors.id === selectedColorId && v.sizes.id === sizeId && v.stock > 0);

  // Price to show (variant price preferred)
  const displayPrice = selectedVariant?.price ?? product?.base_price;

  const selectedSizeName = sizes.find(s => s.id === selectedSizeId)?.name;

  return (
    <div className="group relative flex flex-col">
      {/* Image */}
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
          <span className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold px-2 py-1 uppercase tracking-wider text-stone-900 z-10">
            {product.badge}
          </span>
        )}

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 w-full transform transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            disabled={!selectedVariant || selectedVariant.stock <= 0}
            className="w-full bg-stone-900 text-white py-3 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
          >
            {selectedVariant?.stock > 0 ? (
              <>Add to Bag - {selectedSizeName}</>
            ) : (
              <>Out of Stock</>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col items-start space-y-3">
        <div className="space-y-1 w-full">
          <h3 className="text-sm font-medium text-stone-900 tracking-wide">
            {product.name}
          </h3>
          <p className="text-sm text-stone-500">${displayPrice}</p>
        </div>

        {/* Colors */}
        <div className="flex items-center space-x-2">
          {colors.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedColorId(c.id)}
              className={`w-5 h-5 rounded-full border border-stone-200 transition-all ${
                selectedColorId === c.id ? "ring-2 ring-stone-900 ring-offset-1 scale-110" : "hover:scale-110"
              }`}
              style={{ backgroundColor: c.hex_value }}
              title={c.name}
              aria-label={`Select ${c.name} color`}
            />
          ))}
        </div>

        {/* Sizes */}
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => {
            const available = isSizeAvailable(s.id);

            return (
              <button
                key={s.id}
                onClick={() => setSelectedSizeId(s.id)}
                disabled={!available}
                className={`text-[10px] px-2 py-1 border transition-colors ${
                  selectedSizeId === s.id
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-300 text-stone-600 hover:border-stone-900"
                } ${!available ? "opacity-40 cursor-not-allowed line-through" : ""}`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;