import GroupPage from "@/components/GroupPage";
import prisma from "@/lib/db";

const page = async ({ params }: { params: { group: string } }) => {
  let { group } = params;
  let [groupId, userId] = decodeURIComponent(group).split("$");
  const creator = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const getAllExpenses = await prisma.expense.findMany({
    where: {
      groupId,
    },
    include: {
      debtors: true,
    },
  });
  let getAllMembers = await prisma.group.findMany({
    where: {
      id: groupId,
    },
    include: {
      users: true,
    },
  });
  const members = getAllMembers.map((group) => group.users).flat();
  return (
    <div className="p-4 w-full">
      <GroupPage
        getAllExpenses={getAllExpenses}
        creator={creator?.username as string}
        members={members}
        groupId={groupId}
      />
    </div>
  );
};

export default page;
