import Link from "next/link";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/validateReq";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session } = await validateRequest();
  if (session) redirect("/home")
  return (
    <div className="flex flex-col">
      <nav className="flex gap-3 p-4 absolute right-0">
        <Link href="/signup">
          <Button variant="outline" className="border-gray-500">
            Signup
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" className="border-gray-500">
            Login
          </Button>
        </Link>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">BillSplit</h1>
        <h1 className="text-lg">
          An app to split your bills with ease and simplicity.
        </h1>
      </main>
    </div>
  );
}
