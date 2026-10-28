export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm md:flex-row md:items-center md:justify-between lg:px-6">
        <p>
          <span className="font-semibold text-white">বাজার দর</span>
          {" — "}
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-gray-400 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
