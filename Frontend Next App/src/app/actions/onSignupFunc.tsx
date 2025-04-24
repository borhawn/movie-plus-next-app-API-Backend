'use server'
import { cookies } from "next/headers";
import SignUpPost from "./signup";
import { redirect } from "next/navigation";

const config = {
    maxAge : 60*59,
    path:"/",
    domain:process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
}

export default async function onSignUp(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    dob: formData.get("dob"),
    newsletter: formData.get("newsletter"),
  };

  let response = await SignUpPost(data);

  if(response && response.success){
    cookies().set("jwt",response.token, config);
    redirect("/dashboard")
  }
  

  return response;
}
