import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utills";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function SuccessPage({
  params,
  searchParams,
}: SearchParamProps) {
  const { userId } = params;
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="m-auto flex flex-1 flex-col items-center justify-between gap-10 py-10">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={1000}
            width={1000}
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="Success Image"
            height={300}
            width={280}
          />
          <h2 className="text-[32px] leading-[36px] text-center font-bold md:text-[36px] md:leading-[40px] mb-6 max-w-[600px]">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>

        <section className="flex w-full flex-col items-center gap-8 border-y-2 border-[#1A1D21] py-8 md:w-fit md:flex-row">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="Doctor"
              height={100}
              width={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              height={24}
              width={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button
          variant="outline"
          className="bg-green-500 text-white !important"
          asChild
        >
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="text-[14px] leading-[18px] font-normal justify-items-end text-center text-[#76828D] xl:text-left">
          © 2025 CarePulse
        </p>
      </div>
    </div>
  );
}
