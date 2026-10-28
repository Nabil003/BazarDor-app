"use client";

import { FormEvent, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, UserRound } from "lucide-react";

import toast from "react-hot-toast";

import { authClient, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) {
      toast.error("নাম লিখুন।");
      return;
    }

    if (cleanName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    if (cleanName === session?.user?.name) {
      toast.error("নাম পরিবর্তন করে আবার চেষ্টা করুন।");
      return;
    }

    setIsUpdating(true);

    try {
      const { data, error } = await authClient.updateUser({
        name: cleanName,
      });

      if (error) {
        toast.error(error.message || "আপডেট ব্যর্থ!");
        return;
      }

      console.log("Updated user:", data);

      toast.success("প্রোফাইল আপডেট হয়েছে! 🎉");

      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error("আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f3f8f3] px-4 py-10 md:py-12">
        <div className="mx-auto max-w-2xl">
          <div className="skeleton h-5 w-32"></div>

          <div className="mt-7">
            <div className="skeleton h-8 w-52"></div>

            <div className="skeleton mt-3 h-4 w-72"></div>
          </div>

          <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="skeleton h-14 w-14 rounded-xl"></div>

              <div>
                <div className="skeleton h-5 w-36"></div>

                <div className="skeleton mt-2 h-4 w-52"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="skeleton h-6 w-28"></div>

            <div className="skeleton mt-7 h-4 w-16"></div>

            <div className="skeleton mt-3 h-12 w-full"></div>

            <div className="skeleton mt-6 h-12 w-full"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f8f3] px-4">
        <div className="text-center">
          <UserRound size={45} className="mx-auto text-gray-400" />

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            প্রোফাইল আপডেট করতে প্রথমে সাইন ইন করুন।
          </p>

          <Link
            href="/signin"
            className="mt-5 inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f8f3] px-4 py-10 md:py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-600"
        >
          <ArrowLeft size={16} />
          প্রোফাইলে ফিরে যান
        </Link>

        <div className="mt-7">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            প্রোফাইল আপডেট করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
          </p>
        </div>

        <section className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "Profile"}
                className="h-14 w-14 rounded-xl border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <UserRound size={27} />
              </div>
            )}

            <div>
              <p className="font-semibold text-gray-900">
                {session.user.name || "User"}
              </p>

              <p className="mt-1 text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          <h2 className="text-xl font-bold text-gray-900">তথ্য</h2>

          <form onSubmit={handleUpdate} className="mt-7">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম লিখুন"
                disabled={isUpdating}
                autoComplete="name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
            >
              {isUpdating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  আপডেট হচ্ছে...
                </>
              ) : (
                <>
                  <Save size={17} />
                  তথ্য আপডেট করুন
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
