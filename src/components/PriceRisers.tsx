import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/utils";

interface PriceRisersProps {
  products: Product[];
}

export default function PriceRisers({ products }: PriceRisersProps) {
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => Number(b.change.pct) - Number(a.change.pct))
    .slice(0, 6);

  if (risers.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-6 flex items-center gap-2">
        <span className="text-sm font-bold text-green-600">▲</span>

        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          আজ দাম বেড়েছে
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {risers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
