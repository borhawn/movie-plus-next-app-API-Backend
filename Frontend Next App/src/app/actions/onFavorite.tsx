"use server"
import { getAuthToken } from "../services/get-token";

export default async function onFavorite(formData: FormData){

    let postData = {
        id:formData.get("id")
    }
    console.log(postData)

    let apiResponse = null;
    const authToken = await getAuthToken();

    try {

        const response = await fetch('http://localhost:3001/favorite', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
                Authorization : `Bearer ${authToken}`
            }
            ,
            body: JSON.stringify(postData),
          })

        apiResponse = await response.json()

    } catch (error) {

        apiResponse = error

    }

}