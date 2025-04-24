"use server";

import PostCategory from "./postcategory";

export default async function onPostCategory(prevState: any, formData: FormData) {
  let dataform = new FormData();

  const file = formData.get("file") as File;
  dataform.append("file", file);

  const movieData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  };

  for (const [key, value] of Object.entries(movieData)) {
    dataform.append(key, value);
  }

  let response = await PostCategory(dataform);

  return (response)
}
