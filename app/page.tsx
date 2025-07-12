import PatientForm from "@/components/froms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && (
        <>
          <PassKeyModal />
        </>
      )}
      <section className="border-0 bg-transparent relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />

          <div className="text-[14px] leading-[18px] font-normal mt-20 flex justify-between">
            <p className="justify-items-end text-[#76828D] xl:text-left">
              © 2025 CarePulse
              <br />
              Designed by <strong>Rustam Akbarov</strong>
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="Right Side Image"
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
}
