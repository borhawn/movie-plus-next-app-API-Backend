'use client'
import onFavorite from "@/app/actions/onFavorite";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Movies({ params }: { params: { movieName: string } }) {

    let [movieInfo,setMovieInfo] = useState({_id:"",file:"", releaseYear:"",name:"",description:"", duration:""})
        

      useEffect(() => {

        async function fetchMovies(params:any) {

            const res = await fetch("http://localhost:3001/movie/" + params.movieName , {
              cache: "no-store",
            });
    
            const data = await res.json()
    
            setMovieInfo(data.movie)
    
        }

        fetchMovies(params)

        
      }, []);

      

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-8 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap justify-around">
    <div className="lg:w-1/2 w-full ">
    <Image width={600} height={600} alt="ecommerce" className="object-contain object-center rounded h-[35rem]" src={movieInfo.file}></Image>
    </div>  
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-200 tracking-widest">{movieInfo.releaseYear}</h2>
        <h1 className="text-gray-50 text-3xl title-font font-medium mb-4">{movieInfo.name}</h1>
<hr></hr>
        <p className="leading-relaxed my-5">{movieInfo.description}</p>
        <hr></hr>
        <div className="flex mt-5 justify-between">
        <div className="flex flex-row gap-2">
          <svg fill="white" stroke="white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z"/></svg>
            <span>مدت زمان :  {movieInfo.duration} دقیقه </span>
          </div>
          <form action={onFavorite}>
          <input type="hidden" id="id" name="id" value={movieInfo._id} />
          <button className="p-0 border-0 inline-flex items-center justify-center text-gray-500 mr-4" type="submit">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
