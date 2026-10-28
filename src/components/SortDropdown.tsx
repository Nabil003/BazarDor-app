"use client";

import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function SortDropdown({ sortBy, setSortBy }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-sm text-gray-500">
        সাজান:
      </label>

      <div className="relative">
        <select
          id="sort"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        >
          <option value="default">ডিফল্ট</option>

          <option value="price-asc">দাম: কম থেকে বেশি</option>

          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>

        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}
