"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import MovieCard from "./components/movieCard";
import Link from "next/link";

export default function Home() {
  let [movieSliderInfo, setMovieSliderInfo] = useState([
    {
      slug: "",
      file: "",
      name: "",
      releaseYear: "",
      duration: "",
      description: "",
    },
  ]);
  let [actionMovieInfo, setActionMovieInfo] = useState([]);
  let [scifiMovieInfo, setScifiMovieInfo] = useState([]);

  useEffect(() => {
    async function fetchSliderMovies() {
      const res = await fetch("http://localhost:3001/movie?page=1", {
        cache: "no-store",
      });

      const data = await res.json();

      setMovieSliderInfo(data.movies);
    }

    async function fetchActionMovies() {
      const res1 = await fetch("http://localhost:3001/category/Action", {
        cache: "no-store",
      });

      const data1 = await res1.json();

      setActionMovieInfo(data1.movies);
    }

    async function fetchScifiMovies() {
      const res2 = await fetch("http://localhost:3001/category/Scifi", {
        cache: "no-store",
      });

      const data2 = await res2.json();

      setScifiMovieInfo(data2.movies);
    }

    fetchSliderMovies();
    fetchActionMovies();
    fetchScifiMovies();
  }, []);

  return (
    <>
      <div className="container flex flex-col mx-autop-5 gap-10 self-center">
        <Image
          src="/Images/hero.png"
          className="ilter brightness-[0.2] object-fill object-center"
          fill
          alt="صفحه اصلی"
          style={{ zIndex: "-2" }}
        ></Image>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {movieSliderInfo.map((movie, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="container px-5 py-8 mx-auto">
                  <Link href={`/movies/${movie.slug}`}>
                    <div className="lg:w-4/5 mx-auto flex flex-wrap justify-around items-center">
                      <div className="lg:w-1/2 w-full ">
                        <Image
                          width={600}
                          height={600}
                          alt="ecommerce"
                          className="object-contain object-center rounded h-[27rem]"
                          src={movie.file}
                        ></Image>
                      </div>
                      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h1 className="text-gray-50 text-3xl title-font font-medium mb-0">
                          {movie.name}
                        </h1>
                        <h2 className="text-sm title-font text-gray-200 tracking-widest">
                          {movie.releaseYear}
                        </h2>
                        <p className="leading-relaxed my-5">
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div>
          <h2 className="text-2xl font-bold">فیلم های علمی تخیلی</h2>

          <section className="text-gray-600 body-font flex flex-row justify-center">
            <div className="container px-5 py-12 mx-auto">
              <div className="flex flex-wrap -m-4">
                {scifiMovieInfo.map((movie: any) => {
                  return <MovieCard key={movie._id} movie={movie}></MovieCard>;
                })}
              </div>
            </div>
          </section>
        </div>

        <div>
          <h2 className="text-2xl font-bold">فیلم های اکشن</h2>

          <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
              <div className="flex flex-wrap -m-4">
                {actionMovieInfo.map((movie: any) => {
                  return <MovieCard key={movie._id} movie={movie}></MovieCard>;
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
