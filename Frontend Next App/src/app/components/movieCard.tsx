import Link from "next/link"
import Image from "next/image"

export default function MovieCard({movie}:any){

    return(<div  className="lg:w-1/5 lg:h-[27rem] md:w-1/2 md:h-[30rem] p-4 w-full block relative h-[40rem] rounded-md overflow-hidden">
    <Link
        href={"/movies/" + movie.slug}>
        <Image
          alt="ecommerce"
          className="object-cover object-center w-full h-full block rounded-md relative filter brightness-50"
          src={movie.file}
          width={500}
          height={500}
        ></Image>
        <div className="mt-4 absolute bottom-0 left-0 right-0 py-10 px-10">
          <h3 className="text-teal-50 font-bold text-md tracking-widest title-font mb-2">
            {movie.name}
          </h3>
          <h4 className="text-teal-100 text-md tracking-widest mb-5">{movie.releaseYear}</h4>
          <p className="mt-1 text-justify line-clamp-3 mb-4 text-sm">{movie.description}</p>
          <div className="flex flex-row gap-2">
          <svg fill="white" stroke="white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z"/></svg>
            <span> {movie.duration} دقیقه </span>

          </div>
        </div>
      </Link>
      </div>)

}