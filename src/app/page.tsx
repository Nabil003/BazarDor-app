import Banner from "@/components/Banner";
import PriceRisers from "@/components/PriceRisers";
import PriceFallers from "@/components/PriceFallers";
import AllProducts from "@/components/AllProducts";

import type { Product } from "@/lib/utils";

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Banner />

      <div className="bg-green-50/40 px-4 py-10">
        <div className="mx-auto max-w-7xl space-y-14">
          <PriceRisers products={products} />

          <PriceFallers products={products} />

          <AllProducts products={products} />
        </div>
      </div>
    </>
  );
}
