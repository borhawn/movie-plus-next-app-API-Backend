'use client'

import { useFormState } from "react-dom";
import onEditUser from "../actions/onEditUser";
import AuthAlerts from "../alerts/authAlerts";
const INITIAL_STATE = null;

export default function EditUserForm({user}:any){

    const [formState, formAction] = useFormState(onEditUser, INITIAL_STATE);

    return(<form className="space-y-3 md:space-y-5 lg:px-10" action={formAction}>
        <AuthAlerts response={formState}></AuthAlerts>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">نام کاربری</label>
          <input defaultValue={user.username} type="text" name="username" id="username" autoComplete="username" className="min-w-80 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required></input>
      </div>
      <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ایمیل</label>
          <input defaultValue={user.email} type="email" name="email" id="email" autoComplete="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example@gmail.com" required></input>
      </div>
      <div className="relative">
            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">تاریخ تولد</label>
            <input defaultValue={user.dob} id="dob" name="dob" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="تاریخ تولد خود را انتخاب کنید" required>
        </input>
      </div>
      <div>
          <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">کلمه عبور قدیمی</label>
          <input type="password" name="oldpassword" id="oldpassword" autoComplete="password" placeholder="Old Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-left dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
      </div>
      <div>
          <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">کلمه عبور جدید</label>
          <input type="password" name="newpassword" id="newpassword" autoComplete="password" placeholder="Enter New Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 text-left dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
      </div>
      <button type="submit" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">ویرایش اطلاعات</button>
  </form>)
}