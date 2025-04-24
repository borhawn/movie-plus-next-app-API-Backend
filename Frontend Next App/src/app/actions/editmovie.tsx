'use server'

import { getAuthToken } from "../services/get-token";

export default async function EditMovie(dataform:any){

    let apiResponse = null;
    const authToken = await getAuthToken();


    try {

        const response = await fetch('http://localhost:3001/movie', {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${authToken}`
            }
            ,
            body: JSON.stringify(dataform),
          })

        apiResponse = await response.json()


        
    } catch (error) {

        apiResponse = error

        
    } finally{
        return apiResponse
    }

}