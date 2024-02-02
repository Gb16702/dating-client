"use client";
import Toast from "@/app/components/UI/Toast";
import DropdownActions from "@/app/components/admin/DropdownActions";
import { ViewAction } from "@/app/components/admin/actions";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";

type User = {
  id: number;
  email: string;
  isAdmin: boolean;
  profile: {
    first_name: string;
    last_name: string;
  }
};

const actions = [
  { label: "View", action: ViewAction, href: "/user/profile" },
  { label: "Ban", href: "api/admin/ban/create", required: 'ban' },
]

const handleCopyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard');
};

const IdCell = ({ idValue }: { idValue: string }) => {
  let slicing = idValue.slice(0, 15);
  let displayText = idValue.length > 10 ? `${slicing}...` : idValue;
  return (
    <div
      title={idValue}
      className="cursor-pointer"
      onClick={() => handleCopyToClipboard(idValue)}
    >
      {displayText}
    </div>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <IdCell idValue={row.getValue("id") as string} />,
  },
  {
    accessorKey: "profile.first_name",
    header: "First Name",
  },
  {
    accessorKey: "profile.last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "is_admin",
    header: "Is Admin",
    cell: ({ row }) => {
      return <div>{row.getValue("is_admin") ? "Yes" : "No"}</div>;
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DropdownActions row={row} options={actions} />,
  },
];
