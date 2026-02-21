import FetchProducts from "@/lib/api";
import ProductCard from "./ProductCard";

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



export default async function TrendingNow() {

  const ProductsData=await FetchProducts()
  console.log(ProductsData,'checkproductsdata')
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


