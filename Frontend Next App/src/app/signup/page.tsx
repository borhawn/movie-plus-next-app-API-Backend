'use client'
import Image from "next/image";
import Link from "next/link";
import AuthAlerts from "../alerts/authAlerts";
import onSignUp from "../actions/onSignupFunc";
import { useFormState } from "react-dom";

const INITIAL_STATE = null;

export default function Signup() {


const [formState, formAction] = useFormState(onSignUp, INITIAL_STATE);

    
    return (<>
  <div className="bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-10">
    {formState && <AuthAlerts response={formState}></AuthAlerts>}
      <div className="w-full bg-gray-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  ایجاد حساب کاربری
              </h1>
              <form className="space-y-3 md:space-y-5" action={formAction}>
                    <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">نام کاربری</label>
                      <input type="text" name="username" id="username" autoComplete="username" className="min-w-80 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required></input>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ایمیل</label>
                      <input type="email" name="email" id="email" autoComplete="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example@gmail.com" required></input>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">کلمه عبور</label>
                      <input type="password" name="password" id="password" autoComplete="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-left dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">تکرار کلمه عبور</label>
                      <input type="password" name="confirm-password" id="confirm-password" autoComplete="password" placeholder="Enter Password Again" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 text-left dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                  </div>
                  <div className="relative">
                        <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">تاریخ تولد</label>
                        <input id="dob" name="dob" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="تاریخ تولد خود را انتخاب کنید" required>
                    </input>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input name="newsletter" id="newsletter" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"></input>
                      </div>
                      <div className="mr-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">عضویت در خبرنامه مووی پلاس برای دریافت اخبار سینما.</label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-[#F2613F] hover:bg-[#9B3922] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">ثبت نام</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      قبلا حساب کاربری ساخته اید؟ <Link href="/login" className="font-medium text-[#F2613F] hover:text-[#9B3922] dark:text-primary-500">وارد شوید</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
  </>);
  }
  