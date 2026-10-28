import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatPrice,
  getUnitBn,
  toBengaliNumber,
  type Product,
} from "@/lib/utils";

async function getProduct(slug: string): Promise<Product | null> {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await response.json();

  return products.find((product) => product.slug === slug) || null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const minimumPrices = product.markets.map((market) => market.min);

  const maximumPrices = product.markets.map((market) => market.max);

  const minPrice =
    product.markets.length > 0 ? Math.min(...minimumPrices) : product.today;

  const maxPrice =
    product.markets.length > 0 ? Math.max(...maximumPrices) : product.today;

  const averagePrice =
    product.markets.length > 0
      ? Math.round(
          product.markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0,
          ) / product.markets.length,
        )
      : product.today;

  const isUp = product.change.dir === "up";

  const isDown = product.change.dir === "down";

  const isFlat = product.change.dir === "flat";

  return (
    <main className="min-h-screen bg-[#f3f8f3] px-4 py-7">
      <div className="mx-auto max-w-7xl">
        <div className="breadcrumbs mb-6 text-sm text-gray-500">
          <ul>
            <li>
              <Link href="/" className="transition hover:text-green-600">
                হোম
              </Link>
            </li>

            <li>
              <Link
                href={`/category/${product.category}`}
                className="transition hover:text-green-600"
              >
                {product.categoryNameBn}
              </Link>
            </li>

            <li className="font-medium text-gray-700">{product.nameBn}</li>
          </ul>
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f3f8f3] text-4xl">
                {product.categoryIcon}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {getUnitBn(product.unit)}
                </p>

                <p className="mt-3 text-sm text-gray-600">
                  গতকালের তুলনায় আজ দাম{" "}
                  {isUp && (
                    <span className="font-semibold text-red-500">বেড়েছে।</span>
                  )}
                  {isDown && (
                    <span className="font-semibold text-green-600">কমেছে।</span>
                  )}
                  {isFlat && (
                    <span className="font-semibold text-gray-500">
                      অপরিবর্তিত রয়েছে।
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="w-full rounded-2xl bg-[#f2faf3] px-7 py-5 text-center md:w-[180px]">
              <p className="text-sm text-gray-500">আজকের দাম</p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {formatPrice(product.today)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                টাকা/
                {getUnitBn(product.unit).replace("প্রতি ", "")}
              </p>

              <div className="mt-3">
                {isUp && (
                  <span className="badge border-none bg-red-500 text-white">
                    ▲ {toBengaliNumber(product.change.pct)}%
                  </span>
                )}

                {isDown && (
                  <span className="badge border-none bg-green-600 text-white">
                    ▼ {toBengaliNumber(product.change.pct)}%
                  </span>
                )}

                {isFlat && (
                  <span className="badge badge-ghost">
                    — {toBengaliNumber(product.change.pct)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {formatPrice(minPrice)} টাকা
              </p>

              <p className="mt-2 text-xs text-gray-400">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-2 text-2xl font-bold text-red-500">
                {formatPrice(maxPrice)} টাকা
              </p>

              <p className="mt-2 text-xs text-gray-400">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {formatPrice(averagePrice)} টাকা
              </p>

              <p className="mt-2 text-xs text-gray-400">
                প্রতি কেজির গড় হিসাব
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="table w-full">
                <thead className="bg-white">
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th>বাজার</th>

                    <th>বিভাগ</th>

                    <th className="text-right">সর্বনিম্ন</th>

                    <th className="text-right">সর্বোচ্চ</th>

                    <th className="text-right">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => {
                    const marketAverage = Math.round(
                      (market.min + market.max) / 2,
                    );

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-b border-gray-100 even:bg-[#f7f9f7]"
                      >
                        <td className="font-medium text-gray-700">
                          {market.market}
                        </td>

                        <td className="text-gray-600">{market.division}</td>

                        <td className="text-right text-gray-600">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="text-right text-gray-600">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="text-right font-bold text-gray-800">
                          {formatPrice(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
