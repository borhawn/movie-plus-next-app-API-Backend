"use server";
import PostMovie from "./postmovie";

export default async function onPostMovie(prevState: any, formData: FormData) {
  let dataform = new FormData();

  const file = formData.get("file") as File;
  dataform.append("file", file);

  const movieData = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    duration: formData.get("duration") as string,
    releaseYear: formData.get("releaseYear") as string,
    description: formData.get("description") as string,
    categories: formData.get("categories") as string,
  };

  for (const [key, value] of Object.entries(movieData)) {
    dataform.append(key, value);
  }

  let response = await PostMovie(dataform);

  return (response)
}
