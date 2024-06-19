"use client";

import { login } from "@/actions/authActions";
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

const Login = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={login}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input placeholder="username" name="username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input placeholder="password" name="password" />
            </div>
          </div>
          <CardFooter className="flex justify-end mt-5">
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
