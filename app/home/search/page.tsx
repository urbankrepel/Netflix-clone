import SearchField from "@/app/components/SearchField";
import SearchMovies from "@/app/components/SearchMovies";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    query: string;
  };
}) {
  return (
    <div className="flex flex-col items-center justify-start m-4 h-screen gap-8">
      <SearchField />

      <Suspense fallback={<div>Loading...</div>} key={searchParams?.query}>
        <SearchMovies query={searchParams?.query} />
      </Suspense>
    </div>
  );
}
