import MovieGrid from "@/app/components/movieGrid";

export default function Category({ searchParams, params }: { params: { id: string }, searchParams:any }) {
  let page = Number(searchParams.page);
  if(!page){
    page = 1
  }
    return (
      <MovieGrid page={page} frontEndlink={`http://localhost:3000/categories/${params.id}?page=`} fetchLink={`http://localhost:3001/category/${params.id}?page=`}></MovieGrid>
    );
  }
  