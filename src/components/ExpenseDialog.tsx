"use client";
import { resolveExpense } from "@/actions/dbActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { ExpenseDialogPropTypes } from "@/lib/types";

const ExpenseDialog = ({
  open,
  setOpen,
  data,
  userId,
  path,
}: ExpenseDialogPropTypes) => {
  const percentages = JSON.parse(!data.percentages ? `{}` : data.percentages);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(undefined)}>
      <DialogTrigger className="hidden"></DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col">
          <div className="flex flex-row gap-2">
            <h1 className="font-bold">Paid By - </h1>
            <h1 className="text-md">{data.paidBy}</h1>
          </div>
          <h1>
            This expense was split{" "}
            {!Object.keys(percentages).length ? "equally." : "in percentages."}
          </h1>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bearer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Percent</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.bearers.map((debtExp) => {
              return (
                <TableRow key={debtExp.id}>
                  <TableCell>{debtExp.debtorId}</TableCell>
                  <TableCell>
                    {Number.isInteger(debtExp.amount)
                      ? debtExp.amount
                      : debtExp.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {!Object.keys(percentages).length
                      ? "50%"
                      : `${percentages[debtExp.debtorId]}%`}
                  </TableCell>
                  <TableCell>
                    {debtExp.settled || data.paidBy == debtExp.debtorId
                      ? "Settled"
                      : "Pending"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {userId == data.paidBy ||
        data.bearers.find((d) => d.debtorId == userId) ? (
          <Button
            disabled={
              data.bearers.find((d) => d.debtorId == userId)?.settled ||
              data.status
                ? true
                : false
            }
            onClick={(e) => {
              const button = e.target as HTMLButtonElement;
              const message = button.innerText;
              resolveExpense(message, path, data.expenseId, userId);
            }}
            variant="outline"
            className="border-gray-500 border"
          >
            {userId == data.paidBy ? "Resolve" : "Settle"}
          </Button>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseDialog;
