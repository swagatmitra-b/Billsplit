import { signup } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signup = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={signup}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input name="username" placeholder="username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input name="password" placeholder="password" />
            </div>
            <CardFooter className="flex justify-end mt-5">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
