import Image from "next/image";
import prisma from "../utils/db";
import { MovieCard } from "./MovieCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";

async function getData(userId: string) {
  const userWatchList = await prisma.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      Movie: {
        select: {
          Genre: {
            select: {
              Genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (userWatchList.length > 0) {
    const data = prisma.movie.findMany({
      where: {
        Genre: {
          some: {
            Genre: {
              name: {
                in: userWatchList
                  .map((movie) =>
                    movie.Movie?.Genre.map((genre) => genre.Genre.name)
                  )
                  .flat() as string[],
              },
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        overview: true,
        imageString: true,
        youtubeString: true,
        age: true,
        duration: true,
        release: true,
        WatchLists: {
          where: {
            userId: userId,
          },
        },
      },
      orderBy: {
        release: "desc",
      },
      take: 8,
    });

    return data;
  }

  const data = prisma.movie.findMany({
    select: {
      id: true,
      title: true,
      overview: true,
      imageString: true,
      youtubeString: true,
      age: true,
      duration: true,
      release: true,
      WatchLists: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      release: "desc",
    },
    take: 8,
  });

  return data;
}

export default async function RecentlyAdded() {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user?.email as string);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
      {data.map((movie) => (
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
  );
}
