import Image from "next/image";

const categories = [
  { 
    name: "Cleansers", 
    color: "bg-[#E6DCD3]", // Warm beige/sand
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600", 
    textColor: "text-stone-800"
  },
  { 
    name: "Serums", 
    color: "bg-[#D8E2DC]", // Soft sage green
    image: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=600", 
    textColor: "text-stone-800"
  },
  { 
    name: "Moisturizers", 
    color: "bg-[#F3E5DC]", // Pale peach/rose
    image: "https://images.pexels.com/photos/3618606/pexels-photo-3618606.jpeg?auto=compress&cs=tinysrgb&w=600", 
    textColor: "text-stone-800"
  },
  { 
    name: "Masks", 
    color: "bg-[#CCD5AE]", // Muted olive/green
    image: "https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=600", 
    textColor: "text-stone-800"
  },
  { 
    name: "Bundles", 
    color: "bg-[#D4C1EC]", // Soft lavender/grey
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600", 
    textColor: "text-stone-800"
  },
  { 
    name: "New In", 
    color: "bg-[#F4ACB7]", // Muted pink
    image: "https://images.pexels.com/photos/4202332/pexels-photo-4202332.jpeg?auto=compress&cs=tinysrgb&w=600", 
    textColor: "text-stone-800"
  },
];

export default function CategoryGrid() {
  return (
    <section className="w-full py-12 px-4 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-center mb-10 text-stone-900 dark:text-stone-100">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div 
              key={category.name}
              className={`
                group relative 
                ${category.color} 
                aspect-[4/5] 
                overflow-hidden 
                rounded-lg 
                cursor-pointer
                transition-transform duration-300 hover:-translate-y-1
              `}
            >
              {/* Image (Hidden by default, shown on hover or as background style preference) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                 <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 16vw"
                 />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className={`
                  font-medium text-lg tracking-wide
                  ${category.textColor}
                `}>
                  {category.name}
                </span>
                
                <span className="
                  mt-2 
                  text-xs font-bold uppercase tracking-widest 
                  opacity-0 group-hover:opacity-100 
                  transform translate-y-2 group-hover:translate-y-0
                  transition-all duration-300
                  text-stone-900
                ">
                  Explore
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
