'use server'

import EditUserPost from "./edituser";

export default async function onEditUser(prevState: any, formData: FormData) {

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    oldpassword: formData.get("oldpassword"),
    newpassword: formData.get("newpassword"),
    dob: formData.get("dob"),
  };

  let response = await EditUserPost(data);

  return response;
}
