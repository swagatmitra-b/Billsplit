"use client";
import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { leave } from "@/actions/dbActions";
import { toast } from "@/components/ui/use-toast"

const LeaveGroup = ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => leave(groupId, userId)}>
          Leave Group
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(groupId);
            toast({
              description: "Invite code copied to clipboard"
            })
          }}
        >
          Share Code
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeaveGroup;
