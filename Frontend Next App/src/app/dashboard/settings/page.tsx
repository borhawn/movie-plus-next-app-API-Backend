
import EditUserForm from "@/app/components/editUser";
import { getUserInfo } from "@/app/services/get-user-info";

export default async function DashboardSettings(){

  const data = await getUserInfo();
  const user = data.data;

    return(<div className="bg-slate-700 rounded p-6 pb-8 w-full flex flex-col gap-8">
        <h2 className="text-lg font-semibold">اطلاعات کاربری</h2>
        <EditUserForm user={user}></EditUserForm>
    </div>)

}