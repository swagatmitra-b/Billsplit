"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FriendTable } from "@/lib/types";
import { useState } from "react";
import FriendsDialog from "./FriendsDialog";
import { Expense } from "@/lib/types";

const FriendsTable = ({
  getAllFriendData,
  userId,
}: {
  getAllFriendData: FriendTable[];
  userId: string;
}) => {
  const [open, setOpen] = useState<boolean | undefined>(false);
  const [expenses, setExpenses] = useState<Expense | null>(null);
  const [friendId, setFriendId] = useState<string>("");
  return (
    <div>
      <Table className="my-2">
        <TableHeader>
          <TableRow>
            <TableHead>Friend</TableHead>
            <TableHead>Involved Expenses</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>You Owe</TableHead>
            <TableHead>You Get</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getAllFriendData.map((friend) => {
            if (friend.name != userId)
              return (
                <TableRow
                  onClick={() => {
                    setFriendId(friend.name);
                    setExpenses(friend.involvedExpenses);
                    setOpen(true);
                  }}
                  key={friend.name}
                >
                  <TableCell>{friend.name}</TableCell>
                  <TableCell>{friend.involvedExpenses?.length}</TableCell>
                  <TableCell>
                    {friend.status ? "Resolved" : "Pending"}
                  </TableCell>
                  <TableCell className="text-red-600">
                    {friend.money > 0 ? 0 : Math.abs(friend.money)}
                  </TableCell>
                  <TableCell className="text-green-600">
                    {friend.money < 0 ? 0 : friend.money}
                  </TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
      <FriendsDialog
        open={open}
        setOpen={setOpen}
        expenses={expenses}
        userId={userId}
        friendId={friendId}
      />
    </div>
  );
};

export default FriendsTable;
