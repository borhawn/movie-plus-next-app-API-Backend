"use server";
import EditMovie from "./editmovie";

export default async function onEditMovie(prevState: any, formData: FormData) {

  const movieData = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    duration: formData.get("duration") as string,
    releaseYear: formData.get("releaseYear") as string,
    description: formData.get("description") as string,
    categories: formData.get("categories") as string,
  };

  let response = await EditMovie(movieData);

  return (response)
}
