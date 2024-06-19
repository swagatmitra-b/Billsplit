"use client";

import AddExpense from "@/components/AddExpense";
import ExpenseTable from "@/components/ExpenseTable";
import { Separator } from "@/components/ui/separator";
import { GroupPagePropTypes } from "@/lib/types";

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
        {/* <h1 className="text-md overflow-hidden text-ellipsis ml-2 px-2">
          Members - {members.map((m) => m.username).join(",")}
        </h1> */}
      </div>
      <Separator className="bg-gray-500"/>
      <ExpenseTable expenses={getAllExpenses} userId={creator} />
    </div>
  );
};

export default GroupPage;
