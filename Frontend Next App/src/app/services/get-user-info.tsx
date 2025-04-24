import { getAuthToken } from "./get-token";

export async function getUserInfo() {

  const authToken = await getAuthToken();
  if (!authToken) return { data:null, errors:"Expired auth token" };

  try {
    const response = await fetch("http://localhost:3001/myaccount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    if (data.errors) return { data:null, errors:data.errors };
    return { data: data.user, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, errors: error };
  }
  
}