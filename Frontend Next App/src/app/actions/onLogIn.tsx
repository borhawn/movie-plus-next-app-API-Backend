'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogInPost from "./login";

const config = {
    maxAge : 60*59,
    path:"/",
    domain:process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
}

export default async function onLogIn(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  let response = await LogInPost(data);

  if(response && response.success){
    cookies().set("jwt",response.token, config);
    redirect("/dashboard")
  }
  

  return response;
}
