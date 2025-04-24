import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
    return (
      <div className="container mx-auto flex flex-wrap p-5 flex-col items-center justify-center gap-5">
        <Image src={"/Images/404.png"} alt="Not found Image" height={400} width={400}></Image>
        <h1 className="text-[2rem] font-bold">صفحه ای که وارد کردید یافت نشد‍!</h1>
        <Link className="text-white bg-[#F2613F] hover:bg-[#9B3922] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" href={"/"}>برگشت به صفحه اصلی</Link>
      </div>
    );
  }
  