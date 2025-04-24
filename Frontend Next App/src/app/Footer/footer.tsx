import Image from "next/image"
import Link from "next/link"

let Footer = ()=>{


    return(<footer className="text-teal-50 body-font w-full mt-20">
        <div className="flex-col 2xl:flex-row container px-5 py-24 mx-auto flex gap-x-40 gap-y-5 md:items-center lg:items-start  md:flex-nowrap flex-wrap border-t border-slate-700">
          <div className="w-[100%] 2xl:w-1/2 md:w-[100%] sm:w-[100%]  flex-shrink-0 md:mx-0 text-center">
            <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <Image src="Images/logo.svg" alt="Movie Plus Logo" width={100} height={50} className="w-20 h-14 p-2"></Image>
              <span className="mr-3 text-xl font-bold text-teal-50">مووی پلاس</span>
            </Link>
            <p className="2xl:w-2/3 mt-2 text-sm text-slate-300 text-justify">مووی پلاس یک پلتفرم آنلاین است که به کاربران امکان تماشای آنلاین و دانلود انواع فیلم‌های سینمایی را می‌دهد. این وب‌سایت با ارائه طیف گسترده‌ای از فیلم‌ها، سعی در جلب نظر مخاطبان را دارد.</p>
          </div>
          <div className="w-1/2 md:w-[100%] sm:w-[100%] flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/2 md:w-1/2 sm:w-[100%] w-full px-4">
              <h2 className="title-font font-medium text-teal-50 tracking-widest text-sm mb-5 text-right">منو</h2>
              <nav className="list-none mb-10 text-right">
                <li className="mb-2">
                  <Link href="/" className="text-emerald-50 hover:text-emerald-400 cursor-pointer">خانه</Link>
                </li>
                <li className="mb-2">
                  <Link href="/movies" className="text-emerald-50 hover:text-emerald-400 cursor-pointer">فیلم ها</Link>
                </li>
                <li className="mb-2">
                  <Link href="/categories" className="text-emerald-50 hover:text-emerald-400 cursor-pointer">دسته بندی ها</Link>
                </li>
                <li className="mb-2">
                  <Link href="/about" className="text-emerald-50 hover:text-emerald-400 cursor-pointer">درباره ما</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/2 md:w-1/2 sm:w-[100%] w-full px-4">
                <h2 className="title-font font-medium text-teal-50 tracking-widest text-sm mb-5 text-right">پشتیبانی</h2>
                <nav className="list-none mb-10 text-right">
                  <li className="mb-2">
                    <a href="https://instagram.com/veeveefyweb" className="text-emerald-50 hover:text-emerald-400 text-right">اینستاگرام : @veeveefyweb</a>
                  </li>
                  <li className="mb-2">
                    <a href="tel:09001862666" className="text-emerald-50 hover:text-emerald-400">شماره تماس : 0900186266</a>
                  </li>
                  <li className="mb-2">
                      <a href="https://t.me/veeveefy" className="text-emerald-50 hover:text-emerald-400">تلگرام : @veeveefy</a>
                    </li>
                </nav>
              </div>
          </div>
        </div>
        <div className="bg-gray-800">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-emerald-50 text-sm text-center sm:text-right">تمامی حقوق برای
              <a href="https://veeveefy.com" rel="noopener noreferrer" className="text-[#E94560] mr-1" target="_blank">مووی پلاس </a>
              © محفوظ است
            </p>
            <span className="inline-flex sm:mr-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a href="https://veeveefy.com" className="text-white hover:text-emerald-400 cursor-pointer">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="https://veeveefy.com" className="mr-3 text-gray-500 cursor-pointer">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="https://veeveefy.com" className="mr-3 text-gray-500 cursor-pointer">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a href="https://veeveefy.com" className="mr-3 text-gray-500 cursor-pointer">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>)

}

export default Footer