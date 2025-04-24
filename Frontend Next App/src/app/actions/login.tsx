'use server'
export default async function LogInPost(userInfo:any){

    let apiResponse = null;

    try {

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify(userInfo)
          })

        apiResponse = await response.json()


        
    } catch (error) {

        apiResponse = error

        
    } finally{
        return apiResponse
    }

}