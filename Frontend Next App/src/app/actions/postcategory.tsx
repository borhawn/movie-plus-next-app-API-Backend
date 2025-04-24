'use server'

import { getAuthToken } from "../services/get-token";

export default async function PostCategory(dataform:any){

    let apiResponse = null;
    const authToken = await getAuthToken();


    try {

        const response = await fetch('http://localhost:3001/category', {
            method: 'POST',
            headers:{
                Authorization : `Bearer ${authToken}`
            }
            ,
            body: dataform,
          })

        apiResponse = await response.json()


        
    } catch (error) {

        apiResponse = error

        
    } finally{
        return apiResponse
    }

}