"use client";

interface Props {
  children: React.ReactNode;
}

export default function Navbar({ children }: Props) {
  return (
    <div className="flex flex-col h-100 w-100">
      <div className="flex justify-between items-center w-100 h-12 text-white bg-gradient-to-b from-[#000000] to-transparent">
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <img className="h-8 w-8 ml-4" src="/images/logo.png" alt="logo" />
            <div className="ml-2 text-2xl font-bold">Netflix</div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">Home</div>
            <div className="mr-4">TV Shows</div>
            <div className="mr-4">Movies</div>
            <div className="mr-4">Latest</div>
            <div className="mr-4">My List</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-4">Search</div>
          <div className="mr-4">Urban</div>
        </div>
      </div>
      {children}
    </div>
  );
}
