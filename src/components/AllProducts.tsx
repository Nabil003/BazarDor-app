import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/utils";

interface AllProductsProps {
  products: Product[];
}

export default function AllProducts({ products }: AllProductsProps) {
  return (
    <section id="সব-পণ্য" className="scroll-mt-40">
      <div className="mb-6">
        <h2 className="text-gray-900 text-2xl font-bold">সব পণ্য</h2>

        <p className="text-gray-500 mt-1 text-sm">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3 grid-cols-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
