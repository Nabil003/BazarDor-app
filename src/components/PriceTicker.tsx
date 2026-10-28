"use client";

import { useEffect, useState } from "react";
import { formatPrice, getUnitBn, type Product } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          // represents the api section
          "https://api.api-store.workers.dev/api/bazardor/products",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Product ticker error:", error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  const tickerItems = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-gray-50">
      <div className="animate-marquee flex w-max items-center whitespace-nowrap py-2">
        {tickerItems.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex items-center gap-2 border-r border-gray-300 px-6 text-sm"
          >
            <span>{product.categoryIcon}</span>

            <span className="font-medium text-gray-700">{product.nameBn}</span>

            <span className="text-gray-600">
              {formatPrice(product.today)} টাকা/{getUnitBn(product.unit)}
            </span>

            {product.change.dir === "up" && (
              <span className="font-semibold text-red-500">
                ▲ {product.change.pct}%
              </span>
            )}

            {product.change.dir === "down" && (
              <span className="font-semibold text-green-600">
                ▼ {product.change.pct}%
              </span>
            )}

            {product.change.dir === "flat" && (
              <span className="font-semibold text-gray-500">
                — {product.change.pct}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
