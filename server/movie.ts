import prisma from "@/app/utils/db";
import { Movie } from "@prisma/client";

export async function searchForMovies(query?: string): Promise<Movie[]> {
  if (!query) {
    return [];
  }

  const movies = await prisma.movie.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return movies;
}
