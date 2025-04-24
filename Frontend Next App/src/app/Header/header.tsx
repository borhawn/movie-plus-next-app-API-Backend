'use server'
import Image from "next/image"
import Link from "next/link"
import NextNProgress from 'nextjs-progressbar';
import LogOut from "../components/logoutbtn";
import { getUserMeLoader } from "../services/get-user-me-loader";

let Header = async ()=>{

  const userdata = await getUserMeLoader()



    return(<>
    <header className="text-emerald-50 body-font mb-8">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center border-b border-slate-700">
          <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image src={"/Images/logo.svg"} alt="Movie Plus Logo" width={100} height={50}></Image>
            <span className="mr-3 text-xl font-bold text-teal-100">مووی پلاس</span>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/" className="mr-5 hover:text-emerald-400">خانه</Link>
            <Link href={"/movies"} className="mr-5 hover:text-emerald-400">فیلم ها</Link>
            <Link href="/categories" className="mr-5 hover:text-emerald-400">دسته بندی ها</Link>

            <Link href={"/about"} className="mr-5 hover:text-emerald-400">درباره ما</Link>
          </nav>
          {userdata.ok? (<LogOut user={userdata.data.userData.username}></LogOut>) : (<Link href={"/login"} className="text-white transition-all inline-flex items-center  border-0 py-2 px-4 focus:outline-none bg-[#F2613F] hover:bg-[#9B3922] rounded text-base mt-4 md:mt-0">ثبت نام | ورود
          </Link>)}
        </div>
      </header>
      </>)

}

export default Header