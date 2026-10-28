"use client";

import { FormEvent, Suspense, useEffect, useRef, useState } from "react";

import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";

import { LockKeyhole, Mail } from "lucide-react";

import toast from "react-hot-toast";

import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInSkeleton />}>
      <SignInContent />
    </Suspense>
  );
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const reason = searchParams.get("reason");

  const hasShownRedirectToast = useRef(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  useEffect(() => {
    if (reason === "protected" && !hasShownRedirectToast.current) {
      hasShownRedirectToast.current = true;

      toast.error("এই পেজটি দেখতে প্রথমে সাইন ইন করুন।");
    }
  }, [reason]);

  const handleEmailSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড লিখুন।");

      return;
    }

    if (!cleanEmail.includes("@")) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন।");

      return;
    }

    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");

      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn.email({
        email: cleanEmail,
        password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন ব্যর্থ!");

        return;
      }

      toast.success("সাইন ইন সফল! 🎉");

      router.push(callbackUrl);

      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);

      toast.error("সাইন ইন করতে সমস্যা হয়েছে।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setSocialLoading(provider);

    try {
      await signIn.social({
        provider,
        callbackURL: callbackUrl,
      });
    } catch (error) {
      console.error(`${provider} sign in error:`, error);

      if (provider === "google") {
        toast.error("Google দিয়ে সাইন ইন করা যায়নি।");
      } else {
        toast.error("GitHub দিয়ে সাইন ইন করা যায়নি।");
      }

      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f3f8f3] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>

          <p className="mt-2 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে একাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={socialLoading !== null || isLoading}
            className="
              flex items-center justify-center
              gap-2 rounded-lg
              border border-gray-300
              bg-white px-4 py-3
              text-sm font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {socialLoading === "google" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <span className="flex h-5 w-5 items-center justify-center text-lg font-bold text-blue-500">
                G
              </span>
            )}

            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={socialLoading !== null || isLoading}
            className="
              flex items-center justify-center
              gap-2 rounded-lg
              border border-gray-300
              bg-white px-4 py-3
              text-sm font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {socialLoading === "github" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <span className="flex h-5 w-5 items-center justify-center text-sm font-bold text-gray-900">
                GH
              </span>
            )}

            <span>GitHub</span>
          </button>
        </div>

        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs text-gray-400">অথবা ইমেইল দিয়ে</span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              ইমেইল
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="আপনার ইমেইল"
                autoComplete="email"
                disabled={isLoading}
                className="
                  w-full rounded-lg
                  border border-gray-300
                  bg-white
                  py-3 pl-10 pr-4
                  text-sm text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-green-500
                  focus:ring-2
                  focus:ring-green-100
                  disabled:cursor-not-allowed
                  disabled:bg-gray-50
                "
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <LockKeyhole
                size={17}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="আপনার পাসওয়ার্ড"
                autoComplete="current-password"
                disabled={isLoading}
                className="
                  w-full rounded-lg
                  border border-gray-300
                  bg-white
                  py-3 pl-10 pr-4
                  text-sm text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-green-500
                  focus:ring-2
                  focus:ring-green-100
                  disabled:cursor-not-allowed
                  disabled:bg-gray-50
                "
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || socialLoading !== null}
            className="
              flex w-full
              items-center justify-center
              gap-2
              rounded-lg
              bg-green-600
              px-5 py-3
              text-sm font-semibold
              text-white
              transition
              hover:bg-green-700
              disabled:cursor-not-allowed
              disabled:bg-green-400
            "
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />

                <span>সাইন ইন হচ্ছে...</span>
              </>
            ) : (
              "সাইন ইন"
            )}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="
              font-semibold
              text-green-600
              transition
              hover:text-green-700
            "
          >
            রেজিস্টার করুন
          </Link>
        </p>
      </div>
    </main>
  );
}

function SignInSkeleton() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f3f8f3] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="skeleton mx-auto h-8 w-32" />

        <div className="skeleton mx-auto mt-3 h-4 w-52" />

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="skeleton h-12 rounded-lg" />

          <div className="skeleton h-12 rounded-lg" />
        </div>

        <div className="skeleton mt-8 h-3 w-full" />

        <div className="mt-7">
          <div className="skeleton h-4 w-16" />

          <div className="skeleton mt-3 h-12 w-full rounded-lg" />
        </div>

        <div className="mt-5">
          <div className="skeleton h-4 w-20" />

          <div className="skeleton mt-3 h-12 w-full rounded-lg" />
        </div>

        <div className="skeleton mt-6 h-12 w-full rounded-lg" />

        <div className="skeleton mx-auto mt-7 h-4 w-48" />
      </div>
    </main>
  );
}
