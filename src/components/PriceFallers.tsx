import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/utils";

interface PriceFallersProps {
  products: Product[];
}

export default function PriceFallers({ products }: PriceFallersProps) {
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Number(b.change.pct) - Number(a.change.pct))
    .slice(0, 6);

  if (fallers.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-6 flex items-center gap-2">
        <span className="text-sm font-bold text-red-500">▼</span>

        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          আজ দাম কমেছে
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fallers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
