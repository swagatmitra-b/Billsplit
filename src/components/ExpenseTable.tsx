"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteExpense } from "@/actions/dbActions";
import { Button } from "./ui/button";
import { Expense } from "@/lib/types";
import { FaTrash } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ExpenseDialog from "./ExpenseDialog";
import type { Data } from "@/lib/types";

const ExpenseTable = ({
  expenses,
  userId,
}: {
  expenses: Expense;
  userId: string;
}) => {
  const [open, setOpen] = useState<boolean | undefined>(false);
  const [data, setData] = useState<Data>({
    expenseId: 0,
    paidBy: "",
    status: false,
    percentages: "",
    bearers: [],
  });
  const path = usePathname();
  if (!expenses.length)
    return (
      <h1 className="text-center">
        There are no active expenses in this group.
      </h1>
    );
  else
    return (
      <div className="my-2">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead>Created By</TableHead>
              <TableHead>Paid By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>You Owe</TableHead>
              <TableHead>You Lent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => {
              const debtor = expense.debtors.find((d) => d.debtorId == userId);
              return (
                <TableRow
                  key={expense.id}
                  onClick={() => {
                    setData({
                      expenseId: expense.id,
                      status: expense.status,
                      paidBy: expense.userId,
                      percentages: expense.percentages,
                      bearers: expense.debtors,
                    });
                    setOpen(true);
                  }}
                >
                  <TableCell>{expense.createdBy}</TableCell>
                  <TableCell>{expense.userId}</TableCell>
                  <TableCell>
                    {expense.status ? "Resolved" : "Pending"}
                  </TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell className="text-red-600">
                    {debtor
                      ? expense.userId == userId
                        ? 0
                        : Number.isInteger(debtor.amount)
                        ? debtor.amount
                        : debtor.amount.toFixed(2)
                      : 0}
                  </TableCell>
                  <TableCell className="text-green-600">
                    {expense.userId == userId
                      ? Number.isInteger(expense.amount)
                        ? expense.amount
                        : expense.amount.toFixed(2)
                      : 0}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      disabled={expense.createdBy == userId ? false : true}
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteExpense(expense.id, path);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ExpenseDialog
          open={open}
          setOpen={setOpen}
          data={data}
          userId={userId}
          path={path}
        />
      </div>
    );
};

export default ExpenseTable;
