'use client'
import MoviesList from "@/app/components/moviesList";
import onPostMovie from "@/app/actions/onPostMovie";
import { useFormState } from "react-dom";
import MovieAlerts from "@/app/alerts/movieAlerts";
import { useCallback, useState } from "react";
import onEditMovie from "@/app/actions/onEditMovie";
import Image from "next/image";
const INITIAL_STATE = null;

export default function DashboardMovies({ searchParams }: any) {
  let page = Number(searchParams.page);

  const [editMode, setEditMode] = useState(false);

  const [formState, formAction] = useFormState(editMode ? onEditMovie : onPostMovie, INITIAL_STATE);

  const [formContent, setFormContent] = useState({id:'',name:'',slug:'',releaseYear:'',duration:'',description:'',categories:'',file:'', oldPhoto:""});

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormContent((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleMovieSelect = useCallback((toEditMovie:any) => {
    setEditMode(true)
    setFormContent({id:toEditMovie._id,name:toEditMovie.name,slug:toEditMovie.slug,releaseYear:toEditMovie.releaseYear,duration:toEditMovie.duration,description:toEditMovie.description,categories:toEditMovie.categories,file:"",oldPhoto:toEditMovie.file})
  }, []);

  return (
    <div className="bg-slate-700 rounded p-6 pb-8 w-full flex flex-col gap-8">
      <h2 className="text-lg font-semibold">افزودن فیلم جدید</h2>
      <div className="flex flex-col lg:flex-row justify-between items-top gap-2">
        <div className="w-full lg:w-1/2 rounded overflow-hidden gap-3 flex flex-col">
          <MoviesList page={page} onMovieSelect={handleMovieSelect}></MoviesList>
        </div>
        <div className="w-full lg:w-1/2">
        <MovieAlerts response={formState}></MovieAlerts>
          <form className="space-y-3 md:space-y-5 lg:px-10" action={formAction}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                نام فیلم
              </label>
              <input type="hidden" id="id" name="id" value={formContent.id} />
              <input
              onChange={handleInputChange}
              value={formContent.name}
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="min-w-80 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Interstellar"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="slug"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                پیوند لینک
              </label>
              <input
              onChange={handleInputChange}
                type="text"
                name="slug"
                value={formContent.slug}
                id="slug"
                autoComplete="slug"
                className="min-w-80 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="django-unchained"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="releaseYear"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                سال ساخت
              </label>
              <input
              onChange={handleInputChange}
                type="text"
                value={formContent.releaseYear}
                name="releaseYear"
                id="releaseYear"
                autoComplete="releaseYear"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1996"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                مدت زمان فیلم
              </label>
              <input
              onChange={handleInputChange}
                type="text"
                name="duration"
                value={formContent.duration}
                id="duration"
                autoComplete="duration"
                placeholder="145 دقیقه"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-left dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            </div>
            <div>
              <label
                htmlFor="categories"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                دسته بندی ها
              </label>
              <input
              onChange={handleInputChange}
                type="text"
                value={formContent.categories}
                name="categories"
                id="categories"
                autoComplete="categories"
                placeholder="Seperate with space"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 text-left dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            </div>
            <div className="relative">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                توضیحات
              </label>
              <textarea
              onChange={handleInputChange}
                rows={5}
                id="description"
                value={formContent.description}
                name="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="توضیحات فیلم را وارد کنید"
                required
              ></textarea>
            </div>
            <div className="flex flex-row justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 text-left dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            
            <div>
              <label
                htmlFor="file"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                پوستر فیلم
              </label>
              <input
              onChange={handleInputChange}
              value={formContent.file}
                type="file"
                name="file"
                id="file"
                placeholder="Seperate with space"
              ></input>
            </div>
            {editMode && (<Image alt="movie poster" height={50} width={50} src={formContent.oldPhoto}></Image>)}
            
            </div>
            <div className="flex flex-row justify-start gap-4">
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                افزودن
            </button>
            {editMode && (<button
          type="button"
            onClick={()=>{
              setFormContent({id:'',name:'',slug:'',releaseYear:'',duration:'',description:'',categories:'',file:'',oldPhoto:''})
              setEditMode(false)
            }}
              className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                لفو
            </button>)}
            
            </div>
          </form>

          
        </div>
      </div>
    </div>
  );
}
