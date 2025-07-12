import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface StatCardProps {
  type: "appointments" | "cancelled" | "pending";
  label: string;
  count: number;
  icon: string;
}

export default function StatCard({
  type,
  label,
  count = 0,
  icon,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        " flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg",
        {
          "bg-[url('/assets/images/appointments-bg.png')]":
            type === "appointments",
          "bg-[url('/assets/images/pending-bg.png')]": type === "pending",
          "bg-[url('/assets/images/cancelled-bg.png')]": type === "cancelled",
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className="size-8 w-fit"
        />
        <h2 className="text-white text-[32px] leading-[36px] font-bold">
          {count}
        </h2>
      </div>
      <p className="text-[14px] leading-[18px] font-normal">{label}</p>
    </div>
  );
}
