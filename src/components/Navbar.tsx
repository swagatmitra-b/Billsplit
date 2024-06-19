import Link from "next/link";
import { logout } from "@/actions/authActions";
import { Button } from "./ui/button";

const Navbar = ({ username }: { username: string }) => {
  return (
    <div className="flex justify-between w-full py-5">
      <div className="flex gap-10">
        <Link href="/home">
          <h1 className="text-xl font-bold">BillSplit</h1>
        </Link>
        <h1 className="text-xl">{username}</h1>
      </div>
      <form action={logout}>
        <Button variant="outline" className=" border-gray-500">
          Logout
        </Button>
      </form>
    </div>
  );
};

export default Navbar;
