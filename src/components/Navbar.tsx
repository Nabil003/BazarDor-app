"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  UserRound,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

import { signOut, useSession } from "@/lib/auth-client";
import { getBanglaDate, type Category } from "@/lib/utils";

import PriceTicker from "@/components/PriceTicker";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল!");

            setProfileOpen(false);

            router.push("/");
            router.refresh();
          },

          onError: () => {
            toast.error("সাইন আউট করা যায়নি!");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);

      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  const isCategoryActive = (slug: string) => {
    return pathname === `/category/${slug}`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
              <ShoppingCart size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold leading-tight text-gray-900">
                বাজার দর
              </h1>

              <p className="mt-0.5 text-[11px] text-gray-500">
                {getBanglaDate()}
              </p>
            </div>
          </Link>

          <div className="hidden items-center md:flex">
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="skeleton h-9 w-9 rounded-full" />

                <div className="skeleton h-4 w-20" />
              </div>
            ) : session?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <UserRound size={18} />
                    </div>
                  )}

                  <span className="text-sm font-medium text-gray-700">
                    {session.user.name?.split(" ")[0] || "User"}
                  </span>

                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-[100] w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                    <div className="border-b border-gray-100 px-5 py-4">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {session.user.name || "User"}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        <UserRound size={17} className="text-gray-500" />

                        <span>আমার প্রোফাইল</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-50"
                      >
                        <LogOut size={17} />

                        <span>সাইন আউট</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/signin"
                  className="text-sm font-medium text-gray-700 transition hover:text-green-600"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {!isPending && session?.user && (
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <UserRound size={18} />
                  </div>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {profileOpen && session?.user && (
          <div className="absolute right-14 top-[62px] z-[100] w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl md:hidden">
            <div className="border-b border-gray-100 px-5 py-4">
              <p className="truncate text-sm font-semibold text-gray-900">
                {session.user.name || "User"}
              </p>

              <p className="mt-1 truncate text-xs text-gray-500">
                {session.user.email}
              </p>
            </div>

            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <UserRound size={17} className="text-gray-500" />
                আমার প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut size={17} />
                সাইন আউট
              </button>
            </div>
          </div>
        )}

        <nav className="hidden border-t border-gray-100 md:block">
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 lg:px-6">
            <Link
              href="/"
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                pathname === "/"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-green-600"
              }`}
            >
              হোম
            </Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                  isCategoryActive(category.slug)
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-600 hover:text-green-600"
                }`}
              >
                <span>{category.icon}</span>

                <span>{category.nameBn}</span>
              </Link>
            ))}
          </div>
        </nav>

        {mobileOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <div className="space-y-1 px-4 py-4">
              <Link
                href="/"
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === "/"
                    ? "bg-green-50 text-green-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                হোম
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isCategoryActive(category.slug)
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{category.icon}</span>

                  <span>{category.nameBn}</span>
                </Link>
              ))}

              {!session?.user && (
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                  <Link
                    href="/signin"
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-gray-700"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <PriceTicker />
    </>
  );
}
