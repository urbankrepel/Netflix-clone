import { searchForMovies } from "@/server/movie";
import React from "react";
import Image from "next/image";
import { MovieCard } from "./MovieCard";
import { getServerSession } from "next-auth";

interface SearchMoviesProps {
  query?: string;
}

const SearchMovies: React.FC<SearchMoviesProps> = async ({ query }) => {
  const session = await getServerSession();
  const { movies, not_available, search_movie } = await searchForMovies(
    session?.user?.email as string,
    query
  );
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      {not_available && search_movie && (
        <div className="flex items-center justify-center w-full">
          <p className="text-2xl">
            {search_movie} is not currently available. But we recommend you to
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6 w-full">
        {movies.length === 0 && (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-2xl">Type to search for movies</p>
          </div>
        )}
        {movies.map((movie) => (
          <div key={movie.id} className="relative h-48">
            <Image
              src={movie.imageString}
              alt="Movie"
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />

            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
                <Image
                  src={movie.imageString}
                  alt="Movie"
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />

                <MovieCard
                  movieId={movie.id}
                  overview={movie.overview}
                  title={movie.title}
                  wachtListId={movie.WatchLists[0]?.id}
                  youtubeUrl={movie.youtubeString}
                  watchList={movie.WatchLists.length > 0 ? true : false}
                  key={movie.id}
                  age={movie.age}
                  time={movie.duration}
                  year={movie.release}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
