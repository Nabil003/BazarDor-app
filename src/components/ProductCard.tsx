import Link from "next/link";

import {
  formatPrice,
  getUnitBn,
  toBengaliNumber,
  type Product,
} from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="
        block rounded-2xl
        border border-gray-200
        bg-white
        shadow-sm
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div
            className="
              flex h-14 w-14
              shrink-0
              items-center justify-center
              rounded-xl
              bg-[#f3f8f3]
              text-3xl
            "
          >
            {product.categoryIcon}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-gray-900">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {getUnitBn(product.unit)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <div className="mt-1 flex items-end justify-between gap-3">
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(product.today)} টাকা
            </p>

            <div className="shrink-0">
              {isUp && (
                <span
                  className="
                    inline-flex items-center gap-1
                    rounded-full
                    bg-green-50
                    px-2.5 py-1
                    text-xs font-semibold
                    text-green-600
                  "
                >
                  ▲ {toBengaliNumber(product.change.pct)}%
                </span>
              )}

              {isDown && (
                <span
                  className="
                    inline-flex items-center gap-1
                    rounded-full
                    bg-red-50
                    px-2.5 py-1
                    text-xs font-semibold
                    text-red-500
                  "
                >
                  ▼ {toBengaliNumber(product.change.pct)}%
                </span>
              )}

              {isFlat && (
                <span
                  className="
                    inline-flex items-center gap-1
                    rounded-full
                    bg-gray-100
                    px-2.5 py-1
                    text-xs font-semibold
                    text-gray-500
                  "
                >
                  — {toBengaliNumber(product.change.pct)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
