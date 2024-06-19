"use client";
import { addExpense } from "@/actions/dbActions";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const AddExpense = ({
  groupId,
  creator,
  members,
}: {
  groupId: string;
  creator: string;
  members: {
    id: string;
    username: string;
    password: string;
  }[];
}) => {
  const [debtors, setDebtors] = useState<
    { id: string; username: string; password: string }[]
  >([]);
  const path = usePathname();
  const [percent, setPercent] = useState<Record<string, string>>({});
  const [paidBy, setPaidBy] = useState("");
  const [type, setType] = useState("equal");
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-gray-500">Add Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>Add an expense to your group</DialogDescription>
          </DialogHeader>
          <form action={addExpense}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input name="title" className="col-span-3" />
                <Input
                  name="groupId"
                  className="col-span-3"
                  value={groupId}
                  type="hidden"
                />
                <Input
                  name="paidBy"
                  className="col-span-3"
                  value={paidBy}
                  type="hidden"
                />
                <Input
                  name="createdBy"
                  className="col-span-3"
                  value={creator}
                  type="hidden"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input name="amount" className="col-span-3" type="number" />
                <Input
                  name="debtors"
                  className="col-span-3"
                  type="hidden"
                  value={JSON.stringify(debtors)}
                />
                <Input
                  name="percent"
                  className="col-span-3"
                  type="hidden"
                  value={JSON.stringify(percent)}
                />
                <Input name="type" type="hidden" value={type} />
                <Input name="path" type="hidden" value={path} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label className="text-right">Paid By</Label>
                <Select onValueChange={(val) => setPaidBy(val)}>
                  <SelectTrigger className="w-[17.3rem]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem value={member.username} key={member.id}>
                        {member.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label className="text-right">Bearers</Label>
                <ScrollArea className="h-5/6 rounded-md border w-[17.3rem]">
                  <div className="p-4">
                    {members.map((member) => (
                      <div className="" key={member.id}>
                        <div className="flex py-1 items-center gap-5">
                          <Checkbox
                            onCheckedChange={(checked) => {
                              if (checked && !debtors.includes(member))
                                setDebtors([...debtors, member]);
                              else if (!checked)
                                setDebtors(
                                  debtors.filter((d) => d.id !== member.id)
                                );
                            }}
                          />
                          {member.username}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Split</Label>
                <Tabs
                  defaultValue="account"
                  className="w-[17.3rem]"
                  onValueChange={(val) => setType(val)}
                >
                  <TabsList className="w-full flex justify-around">
                    <TabsTrigger value="account" className="w-full">
                      Equally
                    </TabsTrigger>
                    <TabsTrigger value="percentage" className="w-full">
                      Percentage
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="text-sm">
                    The amount will be split equally amongst all bearers.
                  </TabsContent>
                  <TabsContent value="percentage">
                    <ScrollArea className="h-5/6 rounded-md border w-[17.3rem]">
                      <div className="p-4">
                        {debtors.length ? (
                          debtors.map((debtor) => (
                            <div className="" key={debtor.id}>
                              <div className="flex py-1 items-center gap-5">
                                {debtor.username}
                                <Input
                                  onChange={(e) => {
                                    setPercent((prevPrecent) => ({
                                      ...prevPrecent,
                                      [debtor.username]: e.target.value,
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <h1 className="text-sm text-center">
                            No bearer selected
                          </h1>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddExpense;
