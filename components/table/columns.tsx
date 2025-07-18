"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utills";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => (
      <p className="text-[14px] leading-[14px]">{row.index + 1}</p>
    ),
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        //@ts-ignore
        <p className="text-[14px] leading-[14px]">{appointment.patient.name}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        {/* @ts-ignore */}
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-[14px] leading-[14px] min-w-[100px]">
        {/* @ts-ignore */}
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doctor) => doctor.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt={doctor?.name!}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.user_id}
            appointment={data}
            title="Schedule Appointment"
            description="Please confirm the following details to schedule"
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.user_id}
            appointment={data}
            title="Cancel Appointment"
            description="Are you sure you want to cencel your appointment?"
          />
        </div>
      );
    },
    header: () => <div className="pl-4">Actions</div>,
  },
];
