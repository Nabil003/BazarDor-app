import Image from "next/image";
import Link from "next/link";
import { getBanglaDate } from "@/lib/utils";

export default function Banner() {
  return (
    <section className="px-4 py-5 bg-[#f3f8f3]">
      <div className="max-w-7xl mx-auto">
        <div
          className="
            grid min-h-[245px]
            grid-cols-1 items-center gap-6
            rounded-2xl
            border border-[#dcefe1]
            bg-white
            px-5 py-6
            shadow-sm
            md:grid-cols-[1.5fr_0.5fr]
            md:px-7 md:py-5
          "
        >
          <div className="flex justify-center flex-col items-start">
            <span className="rounded-full py-1 text-xs font-medium text-green-700 bg-green-100 px-3">
              {getBanglaDate()}
            </span>

            <h1 className="mt-3 text-2xl text-gray-900 md:text-3xl font-bold leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন- সর্বোচ্চ এবং দামের পরিবর্তন এক
              জায়গায়।
            </p>

            <Link
              href="#সব-পণ্য"
              className="
                mt-5
                inline-flex
                items-center
                justify-center
                rounded-lg
                bg-green-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-green-700
              "
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <Image
              src="/bazar-hero.png" // represents the hero logo
              alt="বাজারের পণ্য"
              width={240}
              height={200}
              priority
              className="
                h-auto
                w-[180px]
                object-contain
                sm:w-[200px]
                md:w-[220px]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
