import prisma from "@/lib/db";
import Link from "next/link";
import { validateRequest } from "@/lib/validateReq";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LeaveGroup from "@/components/LeaveGroup";
import { allYerOwes } from "@/actions/dbActions";

const GroupCard = async () => {
  const groups = await prisma.group.findMany({
    include: {
      users: true,
    },
  });
  const { user } = await validateRequest();
  if (!groups.length)
    return <h1 className="text-center w-full">Create a group</h1>;
  else
    return (
      <div className="flex justify-center gap-3 flex-wrap">
        {groups.map(async (group) => {
          const amount = await allYerOwes(
            group.id,
            user?.username as string
          );
          if (
            user &&
            group.users.filter((connectedUser) => connectedUser.id == user.id)
              .length
          )
            return (
              <Card className="w-[280px] h-32" key={group.id}>
                <CardHeader className="flex flex-row justify-between">
                  <Link href={`/home/${group.id}$${user.id}`}>
                    <CardTitle>{group.name}</CardTitle>
                  </Link>
                  <LeaveGroup groupId={group.id} userId={user.id} />
                </CardHeader>
                <Link href={`/home/${group.id}$${user.id}`}>
                  <CardContent>
                    {amount > 0
                      ? `You get ${amount} in total`
                      : `You owe ${Math.abs(amount)} in total`}
                  </CardContent>
                </Link>
              </Card>
            );
        })}
      </div>
    );
};

export default GroupCard;
