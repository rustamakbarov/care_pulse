import RegisterForm from "@/components/froms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

export default async function Register({
  params: { userId },
}: SearchParamProps) {
  const user = await getUser(userId);

  return (
    <div className="flex min-h-screen">
      <section className="border-0 bg-transparent relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[860px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />

          <p className="text-[14px] leading-[18px] font-normal justify-items-end text-[#76828D] mt-20 xl:text-left">
            © 2025 CarePulse <br />
            Designed--Rustam Akbarov
          </p>
        </div>
      </section>

      <div className="hidden md:block md:sticky md:top-0 md:h-screen">
        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="Right Side Image"
          className="object-cover h-full max-w-[380px] lg:max-w-[690px]"
        />
      </div>
    </div>
  );
}
