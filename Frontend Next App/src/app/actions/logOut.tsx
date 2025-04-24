'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logOut(){

    cookies().set("jwt", "", {maxAge:0});
    redirect("/")
}