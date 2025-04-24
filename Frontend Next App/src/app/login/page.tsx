'use client'
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import onLogIn from "../actions/onLogIn";
import AuthAlerts from "../alerts/authAlerts";
const INITIAL_STATE = null;

export default function Login() {

  const [formState, formAction] = useFormState(onLogIn, INITIAL_STATE);

  return (
    <>
      <div className="bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-10">
      {formState && <AuthAlerts response={formState}></AuthAlerts>}
        <div className="w-full bg-gray-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              ورود به حساب کاربری
            </h1>
            <form className="space-y-3 md:space-y-5" action={formAction}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  نام کاربری
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required
                ></input>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-teal-50"
                  >
                    کلمه عبور
                  </label>
                  <div className="text-sm">
                    <Link
                      href="/forget-password"
                      className="font-medium text-[#F2613F] hover:text-[#9B3922]"
                    >
                      کلمه عبور خود را فراموش کرده‌اید؟
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                <input type="password" name="password" id="password" autoComplete="password" className="min-w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-left dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required></input>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#F2613F] hover:bg-[#9B3922] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                ورود
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                حساب کاربری ندارید؟{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#F2613F] hover:text-[#9B3922] dark:text-primary-500"
                >
                  ایجاد حساب کاربری جدید
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
