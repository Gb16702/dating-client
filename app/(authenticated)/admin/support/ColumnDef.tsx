"use client";
import DropdownActions from "@/app/components/admin/DropdownActions";
import { ViewAction } from "@/app/components/admin/actions";
import { ColumnDef } from "@tanstack/react-table";

type Support = {
  id: number;
  subject: string;
  description: string;
  status: string;
};

const actions = [
  { label: "View", action: ViewAction, href: "/admin/support/" },

]

export const columns: ColumnDef<Support>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DropdownActions row={row} options={actions} />,
  },
];
