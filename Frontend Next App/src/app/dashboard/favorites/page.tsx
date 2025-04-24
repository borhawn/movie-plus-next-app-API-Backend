import MovieGrid from "@/app/components/movieGrid";

export default function DashboardFavorites(){

    return(<div className="bg-slate-700 rounded p-6 pb-8 w-full flex flex-col gap-8">
      <h2 className="text-lg font-semibold">لیست علاقه مندی</h2>
      <MovieGrid frontEndlink="http://localhost:3000/dashboard/favorites?page=" fetchLink="http://localhost:3001/favorite?page="></MovieGrid>
    </div>)

}