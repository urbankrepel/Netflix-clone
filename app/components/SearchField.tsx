"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default async function SearchField() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      onChange={(e) => handleSearch(e.target.value)}
      type="text"
      placeholder="Search"
      className="w-full bg-transparent p-1 text-2xl border-b border-gray-500 focus:outline-none focus:border-red-500"
    />
  );
}
