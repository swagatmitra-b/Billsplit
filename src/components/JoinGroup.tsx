import { joinGroup } from "@/actions/dbActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JoinGroup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-gray-500">Join Group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Group</DialogTitle>
          <DialogDescription>
            Join a group using the invite code.
          </DialogDescription>
        </DialogHeader>
        <form action={joinGroup}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input name="code" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Join</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroup;
