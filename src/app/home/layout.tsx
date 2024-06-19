import { validateRequest } from "@/lib/validateReq";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";

export default async function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await validateRequest();
  console.log(user);
  if (!session) redirect("/");
  return (
    <div className="flex justify-center w-full ">
      <div className="w-5/6">
        <Navbar username={user.username} />
        <div className="flex gap-3">
          <Sidebar />
          <Separator orientation="vertical" className="ml-2 h-screen bg-gray-500 w-[0.5px]" />
          {children}
        </div>
      </div>
    </div>
  );
}
