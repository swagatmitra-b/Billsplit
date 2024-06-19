import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFriendData } from "@/actions/dbActions";

const FriendsTable = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  const getAllFriendData = await getFriendData(groupId, userId);
  console.log(getAllFriendData);
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
                <TableRow>
                  <TableCell>{friend.name}</TableCell>
                  <TableCell>{friend.involvedExpenses}</TableCell>
                  <TableCell>{friend.status ? "Settled" : "Pending"}</TableCell>
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
    </div>
  );
};

export default FriendsTable;
