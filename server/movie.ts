import prisma from "@/app/utils/db";
import { Movie, WatchList } from "@prisma/client";

interface MovieWithWatchList {
  movies: {
    id: number;
    imageString: string;
    title: string;
    age: number;
    duration: number;
    overview: string;
    release: number;
    youtubeString: string;
    WatchLists: {
      id: string;
      userId: string;
      movieId: number | null;
    }[];
  }[];
  not_available: boolean;
  search_movie?: string;
}

export async function searchForMovies(
  userEmail: string,
  query?: string
): Promise<MovieWithWatchList> {
  if (!query) {
    return {
      movies: [],
      not_available: false,
    };
  }

  const movies = await prisma.movie.findMany({
    select: {
      id: true,
      overview: true,
      title: true,
      WatchLists: {
        where: { userId: userEmail },
      },
      imageString: true,
      youtubeString: true,
      age: true,
      release: true,
      duration: true,
    },
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  if (movies.length === 0) {
    const [genre, title] = await getGenreFromMovieTitle(query);
    if (!genre) {
      return {
        movies: [],
        not_available: false,
      };
    }
    const newMovies = await prisma.movie.findMany({
      select: {
        id: true,
        overview: true,
        title: true,
        WatchLists: {
          where: { userId: userEmail },
        },
        imageString: true,
        youtubeString: true,
        age: true,
        release: true,
        duration: true,
      },
      where: {
        Genre: {
          some: {
            Genre: {
              name: {
                in: genre!,
              },
            },
          },
        },
      },
    });
    return {
      movies: newMovies,
      not_available: true,
      search_movie: title,
    };
  }

  return {
    movies: movies,
    not_available: false,
  };
}

async function getGenreFromMovieTitle(
  title: string
): Promise<[string[] | null, string]> {
  const response = await fetch(
    `http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}&i=tt3896198`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return [null, ""];
  }
  const data = await response.json();

  if (!data.Genre) {
    return [null, ""];
  }

  return [data.Genre.split(", "), data.Title];
}
