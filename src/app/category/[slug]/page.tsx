"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Home } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";

import { toBengaliNumber, type Category, type Product } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams();

  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);

  const [category, setCategory] = useState<Category | null>(null);

  const [sortBy, setSortBy] = useState("default");

  const [isLoading, setIsLoading] = useState(true);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const [productsResponse, categoryResponse] = await Promise.all([
          fetch(
            `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
          ),

          fetch(
            `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`,
          ),
        ]);

        if (!productsResponse.ok || !categoryResponse.ok) {
          throw new Error("Failed to fetch category data");
        }

        const productsData = await productsResponse.json();

        const categoryData = await categoryResponse.json();

        const finalProducts: Product[] = Array.isArray(productsData)
          ? productsData
          : productsData?.data || [];

        const finalCategory: Category | null =
          categoryData?.data || categoryData || null;

        setProducts(finalProducts);

        setCategory(finalCategory);
      } catch (error) {
        console.error("Category page error:", error);

        setHasError(true);

        setProducts([]);

        setCategory(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") {
      return Number(a.today) - Number(b.today);
    }

    if (sortBy === "price-desc") {
      return Number(b.today) - Number(a.today);
    }

    return 0;
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f3f8f3] px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="skeleton h-14 w-14 rounded-xl" />

              <div>
                <div className="skeleton h-6 w-36" />

                <div className="skeleton mt-2 h-4 w-52" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="skeleton h-10 w-48" />
          </div>

          <div className="skeleton mt-6 h-4 w-40" />

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="skeleton h-14 w-14 rounded-xl" />

                  <div className="flex-1">
                    <div className="skeleton h-5 w-28" />

                    <div className="skeleton mt-2 h-3 w-20" />
                  </div>
                </div>

                <div className="skeleton mt-6 h-3 w-20" />

                <div className="skeleton mt-2 h-6 w-28" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (hasError || !category || products.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f3f8f3] px-4">
        <div className="max-w-md text-center">
          <p className="text-7xl font-bold text-green-600">404</p>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <Home size={17} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f8f3] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f3f8f3] text-3xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {toBengaliNumber(products.length)}
                টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center justify-end">
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </section>

        <p className="mt-6 text-sm text-gray-500">
          মোট{" "}
          <span className="font-medium text-gray-700">
            {toBengaliNumber(products.length)}
          </span>
          টি পণ্য দেখানো হচ্ছে
        </p>

        <section className="mt-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
