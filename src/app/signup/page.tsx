"use client";

import { FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { signIn, signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন।");
      return;
    }

    if (!email.trim()) {
      toast.error("ইমেইল লিখুন।");
      return;
    }

    if (!password) {
      toast.error("পাসওয়ার্ড লিখুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না।");

      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "রেজিস্ট্রেশন ব্যর্থ!");

        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! 🎉");

      router.push("/signin");

      router.refresh();
    } catch (error) {
      console.error("Sign up error:", error);

      toast.error("অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setSocialLoading(provider);

    try {
      const result = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result?.error) {
        toast.error(
          result.error.message || `${provider} দিয়ে চালিয়ে যাওয়া যায়নি।`,
        );

        setSocialLoading(null);
      }
    } catch (error) {
      console.error("Social auth error:", error);

      toast.error(
        provider === "google"
          ? "Google দিয়ে চালিয়ে যাওয়া যায়নি।"
          : "GitHub দিয়ে চালিয়ে যাওয়া যায়নি।",
      );

      setSocialLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f8f4] px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
          <form onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="যেমন: রহিম উদ্দিন"
                autoComplete="name"
                className="input input-bordered w-full bg-white"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="input input-bordered w-full bg-white"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="new-password"
                className="input input-bordered w-full bg-white"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="আবার লিখুন"
                autoComplete="new-password"
                className="input input-bordered w-full bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || socialLoading !== null}
              className="btn mt-5 w-full border-none bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  অ্যাকাউন্ট তৈরি হচ্ছে...
                </>
              ) : (
                "অ্যাকাউন্ট তৈরি করুন"
              )}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">অথবা</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={socialLoading !== null || isLoading}
              onClick={() => handleSocialSignIn("google")}
              className="btn btn-outline border-gray-200 bg-white text-xs text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
            >
              {socialLoading === "google" ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <span className="text-lg font-bold text-blue-500">G</span>
              )}
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              disabled={socialLoading !== null || isLoading}
              onClick={() => handleSocialSignIn("github")}
              className="btn btn-outline border-gray-200 bg-white text-xs text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
            >
              {socialLoading === "github" ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <span className="text-lg">●</span>
              )}
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-green-600 hover:text-green-700"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div className="mt-7 text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 transition hover:text-green-600"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
