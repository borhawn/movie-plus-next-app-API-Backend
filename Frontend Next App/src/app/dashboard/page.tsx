"use server";

import { getAllUsers } from "../services/get-all-users";
import { getUserInfo } from "../services/get-user-info";

export default async function DashboardMain() {
  const data = await getUserInfo();
  const currentUserInfo = data.data;

  const data2 = await getAllUsers();
  const AllUsers = data2.data;

  return (
    <div className="flex container gap-8 flex-row flex-wrap lg:flex-nowrap">
      <div className="bg-slate-700 rounded p-6 pb-8 w-full lg:w-1/3 flex flex-col gap-8">
        <h2 className="text-lg font-semibold">اطلاعات حساب</h2>
        {currentUserInfo? (<div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center gap-2 text-gray-500 rounded p-2">
            <span className="text-teal-400">نام کاربری :</span>
            <span className="text-teal-200">{currentUserInfo?.username}</span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2 text-gray-500 rounded p-2">
            <span className="text-teal-400">ایمیل :</span>
            <span className="text-teal-200">{currentUserInfo?.email}</span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2 text-gray-500 rounded p-2">
            <span className="text-teal-400">تاریخ تولد :</span>
            <span className="text-teal-200">{currentUserInfo?.dob}</span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2 text-gray-500 rounded p-2">
            <span className="text-teal-400">آخرین ورود :</span>
            <span className="text-teal-200">{currentUserInfo?.lastlogin}</span>
          </div>
          <div className="flex flex-row justify-between items-center gap-2 text-gray-500 rounded p-2">
            <span className="text-teal-400">نقش :</span>
            <span className="text-teal-200">{currentUserInfo?.rank}</span>
          </div>
        </div>) : (<div className="flex flex-col gap-2">
         <span className="text-red-400">خطایی در هنگام دریافت اطلاعات کاربر رخ داد</span>
        </div>)}
      </div>
      <div className="bg-slate-700 rounded p-6 pb-8 w-full lg:w-1/3 flex flex-col gap-8">
        <h2 className="text-lg font-semibold">لیست کاربران</h2>
        <div className="flex flex-col gap-2 overflow-y-scroll h-full">
{AllUsers? (          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ردیف
                  </th>
                  <th scope="col" className="px-6 py-3">
                    نام کاربری
                  </th>
                  <th scope="col" className="px-6 py-3">
                    دسترسی
                  </th>
                </tr>
              </thead>
              <tbody>
                {AllUsers.map((u:any,index:any)=>{
                  return(<tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index+1}
                    </th>
                    <td className="px-6 py-4">{u.username}</td>
                    <td className="px-6 py-4">{u.rank}</td>
                  </tr>)
                })}
              </tbody>
            </table>
          </div>) : (<span className="text-red-400">خطایی در هنگام دریافت اطلاعات رخ داد</span>)}
        </div>
      </div>
      <div className="bg-slate-700 rounded p-6 pb-8 w-full lg:w-1/3 flex flex-col gap-8">
        <h2 className="text-lg font-semibold">شبکه های مجازی</h2>
        <span className="flex flex-col gap-2">
          <a
            href="https://facebook.com/borhawn"
            className="flex flex-row justify-between items-center gap-2 text-gray-500 cursor-pointer hover:bg-slate-800 rounded p-4"
          >
            <span className="text-teal-200">Facebook</span>
            <svg
              fill="#4267B2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a
            href="https://twitter.com/borhawnm"
            className="flex flex-row justify-between items-center gap-2 text-gray-500 cursor-pointer hover:bg-slate-800 rounded p-4"
          >
            <span className="text-teal-200">Twitter</span>
            <svg
              fill="#1DA1F2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a
            href="https://instagram.com/veeveefyweb"
            className="flex flex-row justify-between items-center gap-2 text-gray-500 cursor-pointer hover:bg-slate-800 rounded p-4"
          >
            <span className="text-teal-200">Instagram</span>
            <svg
              fill="none"
              stroke="#E1306C"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a
            href="https://linkedin.com/borhawnm"
            className="flex flex-row justify-between items-center gap-2 text-gray-500 cursor-pointer hover:bg-slate-800 rounded p-4"
          >
            <span className="text-teal-200">LinkedIn</span>
            <svg
              fill="#0a66c2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </div>
  );
}
