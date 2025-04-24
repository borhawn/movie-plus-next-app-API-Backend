import CategoryCard from "./categoryCard";
import Pagination from "./pagination";

export default async function CategoryGrid({page}:any){

        let categoriesList = null
        let totalPages = null
        if(!page){page = 1}
        
        
        const link = "http://localhost:3000/categories?page="
      try {
        const res = await fetch(`http://localhost:3001/category?page=${page}`, {
          cache: "no-store",
        });

        const data = await res.json()

        categoriesList = data.categories
        totalPages = data.totalPages

      } catch (error:any) {

        return(<div>{error}</div>)

      }
        
          return(<>

            <section className="text-gray-600 body-font">
                    <div className="container px-5 py-12 mx-auto">
                      <div className="flex flex-wrap -m-4">
                        {categoriesList.map((category: any) => {
                          return (<CategoryCard key={category._id} cat={category}></CategoryCard>);
                        })}
                      </div>
                    </div>
                  </section>

                  <Pagination link={link} totalPages={totalPages} currentPage={page}></Pagination>

                </>)

    }
    