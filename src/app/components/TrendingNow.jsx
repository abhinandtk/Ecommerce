import FetchProducts from "@/lib/api";
import ProductCard from "./ProductCard";



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
          {ProductsData.map((product) => (
            <div key={product.id} className="min-w-70 md:min-w-[320px] lg:min-w-[calc(25%-18px)] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


