"use client";
import DropdownActions from "@/app/components/admin/DropdownActions";
import { ViewAction } from "@/app/components/admin/actions";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
};

const actions = [
  { label: "View", action: ViewAction, href: "/admin/reports/" },
  { label: "Ban", href: "api/admin/ban/create", required: 'ban' },
  { label: "Delete", href: "api/users/reports/delete", required: 'delete' },
]

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "reporter_user_id",
    header: "Reporter Name",
  },
  {
    accessorKey: "reported_user_id",
    header: "Reported Name",
  },
  {
    accessorKey: "report_description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DropdownActions row={row} options={actions} />;
    },
  }

];
