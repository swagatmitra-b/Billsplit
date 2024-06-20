import {
  Dialog,
  DialogContent,
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
import { FriendsDialogType } from "@/lib/types";

const FriendsDialog = ({
  open,
  setOpen,
  expenses,
  userId,
  friendId,
}: FriendsDialogType) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(undefined)}>
        <DialogTrigger className="hidden"></DialogTrigger>
        <DialogContent>
          <Table className="p-3 py-2">
            <TableHeader>
              <TableRow>
                <TableHead>Expense</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>You Owe</TableHead>
                <TableHead>You Get</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses?.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell>{exp.title}</TableCell>
                  <TableCell>{exp.amount}</TableCell>
                  <TableCell>{exp.status ? "Resolved" : "Pending"}</TableCell>
                  <TableCell>
                    {exp.userId == userId
                      ? 0
                      : exp.debtors.find((d) => d.debtorId == userId)?.amount}
                  </TableCell>
                  <TableCell>
                    {exp.userId == userId
                      ? exp.debtors.find((d) => d.debtorId == friendId)?.amount
                      : 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FriendsDialog;
