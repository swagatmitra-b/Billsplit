import { Dispatch, SetStateAction } from "react";
export type Expense = ({
  debtors: {
    id: number;
    amount: number;
    expenseId: number;
    debtorId: string;
    settled: boolean;
  }[];
} & {
  id: number;
  title: string;
  amount: number;
  status: boolean;
  createdBy: string;
  percentages: string;
  groupId: string;
  userId: string;
})[];

export type Data = {
  expenseId: number;
  paidBy: string;
  percentages: string;
  status: boolean;
  bearers: {
    id: number;
    amount: number;
    debtorId: string;
    expenseId: number;
    settled: boolean;
  }[];
};

export type ExpenseDialogPropTypes = {
  open: boolean | undefined;
  setOpen: Dispatch<SetStateAction<boolean | undefined>>;
  userId: string;
  path: string;
  data: Data;
};

export type GroupPagePropTypes = {
  getAllExpenses: Expense;
  creator: string;
  members: {
    id: string;
    username: string;
    password: string;
  }[];
  groupId: string;
};

export type FriendTable = {
  name: string,
  involvedExpenses: Expense | null
  status: boolean;
  money: number
}

export type FriendsDialogType = {
  open: boolean | undefined;
  setOpen: Dispatch<SetStateAction<boolean | undefined>>;
  expenses: Expense | null;
  userId: string;
  friendId: string;
}
