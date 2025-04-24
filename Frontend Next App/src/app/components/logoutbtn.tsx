import Link from "next/link";
import Image from "next/image";
import { logOut } from "../actions/logOut";

export default function LogOut({user}:any){


          return(<>
          <Link href='/dashboard' className="mx-2 flex flex-row items-center gap-2">
          <Image src={"/Images/user.jpg"} height={40} width={40} className="rounded-full" alt="User Image"></Image>
          <span>{user}</span>
          </Link>
          <form action={logOut}>
            <button type="submit" className="text-white text-sm p-3 hover:text-gray-400">خروج</button>
          </form>
          </>)

    }
    