import AppointmentForm from "@/components/froms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

export default async function NewAppointment({ params }: SearchParamProps) {
  const { userId } = params;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="border-0 bg-transparent relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="justify-items-end text-[14px] leading-[18px] font-normal mt-20 text-[#76828D] xl:text-left ">
            © 2025 CarePulse
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="Appointment Image"
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
}
