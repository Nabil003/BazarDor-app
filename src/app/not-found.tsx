import Link from "next/link";
import { Home, SearchX } from "lucide-react";

// represents the not-found page
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f3f8f3] px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <SearchX size={36} className="text-green-600" />
        </div>

        <h1 className="mt-6 text-7xl font-bold text-green-600">404</h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mt-3 text-sm leading-7 text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। লিংকটি ভুল হতে পারে অথবা
          পেজটি সরিয়ে ফেলা হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <Home size={17} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
