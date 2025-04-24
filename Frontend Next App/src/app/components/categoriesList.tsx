import { useEffect, useState } from "react";
import Pagination from "./pagination";
import Image from "next/image";

export default function CategoryList({ page, onCategorySelect }: any) {
  const [categoryList, setcategoriesList] = useState([]);
  const [totalPages, settotalPages] = useState([]);
  if (!page) {
    page = 1;
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`http://localhost:3001/category?page=${page}`, {
          cache: "no-store",
        });
    
        const data = await res.json();
    
    
        setcategoriesList(data.categories);
        settotalPages(data.totalPages);
      } catch (error: any) {
        return <div>{JSON.stringify(error)}</div>;
      }
    
    }
    fetchMovies();
  }, [page]);
  
  
  return (
    <>
      <div className="rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ردیف
              </th>
              <th scope="col" className="px-6 py-3">
                پوستر
              </th>
              <th scope="col" className="px-6 py-3">
                فیلم
              </th>
              <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((movie: any, index: any) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {((page - 1)*5) + index + 1}
                  </th>
                  <td className="px-6 py-4">
                    <Image
                      src={movie.file}
                      alt="پوستر فیلم"
                      height={50}
                      width={50}
                    ></Image>
                  </td>
                  <td className="px-6 py-4">{movie.name}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={()=> onCategorySelect(movie)} className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">ویرایش</button>
                </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        link="/dashboard/categories?page="
        totalPages={totalPages}
        currentPage={page}
      ></Pagination>
    </>
  );
}
