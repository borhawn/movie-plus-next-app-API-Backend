"use server";

import EditCategory from "./editcategory";

export default async function onEditCategory(prevState: any, formData: FormData) {
  let dataform = new FormData();

  const file = formData.get("file") as File;
  dataform.append("file", file);

  const movieData = {
    id:formData.get("id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  };

  for (const [key, value] of Object.entries(movieData)) {
    dataform.append(key, value);
  }

  let response = await EditCategory(dataform);

  return (response)
}
