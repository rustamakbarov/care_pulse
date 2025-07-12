import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <div
      className={clsx("flex w-fit items-center gap-2 rounded-full px-4 py-2", {
        "bg-green-500": status === "scheduled",
        "bg-red-500": status === "cancelled",
        "bg-blue-500": status === "pending",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />

      <p
        className={clsx("text-[12px] font-semibold capitalize leading-[12px]", {
          "text-green-200": status === "scheduled",
          "text-red-200": status === "cancelled",
          "text-blue-200": status === "pending",
        })}
      >
        {status}
      </p>
    </div>
  );
}
