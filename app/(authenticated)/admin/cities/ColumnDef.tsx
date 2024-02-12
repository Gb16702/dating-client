"use client";
import DropdownActions from "@/app/components/admin/DropdownActions";
import { EditAction } from "@/app/components/admin/actions";
import { ColumnDef } from "@tanstack/react-table";

type Cities = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  zip: string;
};

const actions = [
  { label: "Edit", action: EditAction, href: "/admin/cities/" },
  { label: "Delete", href: "api/admin/cities/delete", required: "delete" },
]

export const columns: ColumnDef<Cities>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Citiy",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
  {
    accessorKey: "zip",
    header: "Zip Code",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DropdownActions row={row} options={actions} />,
  },
];
