import MovieVideo from "../components/MovieVideo";
import PDFRedirect from "../components/PDFRedirect";
import RecentlyAdded from "../components/RecentlyAdded";

export default function HomePage() {
  return (
    <div className="p-5 lg:p-0">
      <PDFRedirect />
      <MovieVideo />
      <h1 className="text-3xl font-bold ">Recommended for you</h1>
      <RecentlyAdded />
    </div>
  );
}
