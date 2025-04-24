import { getAuthToken } from "../services/get-token";
import MovieCard from "./movieCard";
import Pagination from "./pagination";

export default async function MovieGrid({page, frontEndlink, fetchLink}:any){

        let moviesList = null
        let totalPages = null
        const authToken = await getAuthToken();
        if(!page){page = 1}
        
      try {
        const res = await fetch(fetchLink+page, {
          cache: "no-store",
          headers:{
            Authorization : `Bearer ${authToken}`
        }
        });

        const data = await res.json()

        moviesList = data.movies
        totalPages = data.totalPages

      } catch (error:any) {

        return(<div>{error}</div>)

      }
        
          return(<>



                  {moviesList=="" || moviesList==null ? (<section className="text-gray-600 body-font">
                    <div className="container px-5 py-12 mx-auto">
                      <div className="flex flex-wrap justify-center items-center">
                        <h1>لیست فیلم ها خالی است</h1>
                      </div>
                    </div>
                  </section>) : (<section className="text-gray-600 body-font">
                    <div className="container px-5 py-12 mx-auto">
                      <div className="flex flex-wrap -m-4">
                        {moviesList.map((movie: any) => {
                          return (<MovieCard key={movie._id} movie={movie}></MovieCard>);
                        })}
                      </div>
                    </div>
                  </section>)}

                  

            

                  <Pagination link={frontEndlink} totalPages={totalPages} currentPage={page}></Pagination>

                </>)

    }
    