import AddExpense from "@/components/AddExpense";
import ExpenseTable from "@/components/ExpenseTable";
import { Separator } from "@/components/ui/separator";
import { GroupPagePropTypes } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendsTable from "./FriendsTable";

const GroupPage = ({
  getAllExpenses,
  creator,
  members,
  groupId,
}: GroupPagePropTypes) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <AddExpense groupId={groupId} members={members} creator={creator} />
      </div>
      <Separator className="bg-gray-500" />
      <Tabs defaultValue="expenses" className="w-full flex flex-col items-center">
        <TabsList className="">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses" className="w-full">
          <ExpenseTable expenses={getAllExpenses} userId={creator} />
        </TabsContent>
        <TabsContent value="friends" className="w-full">
          <FriendsTable groupId={groupId} userId={creator}/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupPage;
