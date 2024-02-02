"use client";
import DropdownActions from "@/app/components/admin/DropdownActions";
import { EditAction } from "@/app/components/admin/actions";
import { ColumnDef } from "@tanstack/react-table";

type Hobbies = {
  id: number;
  name: string;
};

const actions = [
  { label: "Edit", action: EditAction, href: "/admin/interests/" },
  { label: "Delete", href: "api/interests/delete", required: 'delete' },
]

export const columns: ColumnDef<Hobbies>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Hobby",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DropdownActions row={row} options={actions} />,
  },
];
