
import MovieGrid from "../components/movieGrid";

export default async function Movies({searchParams}:any) {
  let page = Number(searchParams.page);
  if(!page){page = 1}

  return (
    <>
      <MovieGrid page={page} frontEndlink={"http://localhost:3000/movies?page="} fetchLink={"http://localhost:3001/movie?page="}></MovieGrid>
    </>
  );
}
