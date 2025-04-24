import Link from "next/link"
import Image from "next/image"

export default function CategoryCard({cat}:any){

    return(<Link
        href={"/categories/" + cat.name}
        className="lg:w-1/4 md:w-1/2 p-4 w-full block relative h-64 rounded-md overflow-hidden">
        <Image
          alt="ecommerce"
          className="object-cover object-center w-full h-full block rounded-md relative filter brightness-50"
          src={cat.file}
          width={600}
          height={200}
        ></Image>
        <div className="mt-4 absolute inset-0 py-10 px-10">
          <h3 className="text-teal-50 font-bold text-lg tracking-widest title-font mb-4">
            {cat.name}
          </h3>
          <p className="mt-1 text-justify">{cat.description}</p>
        </div>
      </Link>)

}