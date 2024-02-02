import { useState } from "react";
import Polygon from "../UI/Modal/Polygon";
import { BanAction, DeleteAction } from "./actions";
import { useRouter } from "next/navigation";

type AdminModalsProps = {
  row: any;
  href?: string;
  onClose: () => void;
};


export function AdminModalsDelete({ row, href, onClose }: AdminModalsProps) {
  const router = useRouter();
  function handleDelete() {
    if (href) DeleteAction(row.getValue("id"), href);
    router.refresh();
    onClose();
  }
  return (
    <Polygon onClickEvent={onClose}>
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-[21px] font-bold">Delete {row.getValue("name")} ?</h1>
          <button onClick={onClose}>X</button>
        </div>
        <p>Are you sure you want to delete {row.getValue("name")} ?</p>
        <div className="flex justify-between">
          <button className="w-full mt-3 bg-gray-500 text-white p-2 rounded-md" onClick={onClose}>Cancel</button>
          <button
            onClick={handleDelete}
            className="w-full mt-3 bg-red-500 text-white p-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </Polygon>
  );
}

export function AdminModalsBan({
  row,
  href,
  onClose,
}: AdminModalsProps) {
  const fullName = `${row.original.profile.first_name} ${row.original.profile.last_name}`;
  const user_id = row.original.id;
  const [reason, setReason] = useState<string>("");

  function handleBan() {
    if (href) BanAction(user_id, href, reason);
    onClose();
  };

  return (
    <Polygon onClickEvent={() => console.log("OK")}>
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-[21px] font-bold">Ban {fullName}</h1>
          <button onClick={onClose}>X</button>
        </div>
        <textarea
          className="w-full mt-3 h-[120px]"
          placeholder="Motif du bannissement"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          onClick={handleBan}
          className="w-full mt-3 bg-red-500 text-white p-2 rounded-md"
        >
          Bannir
        </button>
      </div>
    </Polygon>
  );
}
