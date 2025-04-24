"use client"

export default function AuthAlerts({response}:any) {
  if(response!==null){

    if(response?.error == "validation"){
      return(<div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <svg className="dark:text-red-400 flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path className="dark:text-red-400" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="dark:text-red-400 sr-only">Danger</span>
        <div>
          <span className="dark:text-red-400 font-medium">{response.message}</span>
            <ul className="mt-1.5 list-disc list-inside">
              {response.errors.map((e:any)=>{return ((<li className="dark:text-red-400">{e.msg}</li>))})}
          </ul>
        </div>
      </div>)
    }else if(response?.error == "server"){
    return(<div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <svg className="dark:text-red-400 flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path className="dark:text-red-400" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="dark:text-red-400 sr-only">Danger</span>
      <div>
        <span className="dark:text-red-400 font-medium">خطای سرور</span>
            <p className="dark:text-red-400">{JSON.stringify(response.errors)}</p>
      </div>
    </div>)
  }else if(response?.error == "auth"){
    return(<div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <svg className="dark:text-red-400 flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path className="dark:text-red-400" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="dark:text-red-400 sr-only">Danger</span>
      <div>
        <span className="dark:text-red-400 font-medium">عملیات انجام نشد</span>
            <p className="dark:text-red-400">{response.errors.msg}</p>
      </div>
    </div>)
  }else if(response?.success == "true"){
    return(<div className="flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      <svg className="dark:text-green-400 flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path className="dark:text-green-400" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="dark:text-green-400 sr-only">Danger</span>
      <div>
        <span className="dark:text-green-400 font-medium">با موفقیت وارد حساب شدید!</span>
          <ul className="mt-1.5 list-disc list-inside">
            <li className="dark:text-green-400">{response.message}</li>
        </ul>
      </div>
    </div>)
  }else{
  
    return(<div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <svg className="dark:text-red-400 flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path className="dark:text-red-400" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="dark:text-red-400 sr-only">Danger</span>
      <div>
        <span className="dark:text-red-400 font-medium">عملیات انجام نشد</span>
            <p className="dark:text-red-400">{JSON.stringify(response)}</p>
      </div>
    </div>)
  }


  }
 

    

}