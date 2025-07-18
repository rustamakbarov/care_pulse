"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utills";

export default function PassKeyModal() {
  const [open, setOpen] = useState(true);
  const [passKey, setPassKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const path = usePathname();

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
        // setError("Invalid passkey. Please try again.");
      }
    }
  }, [encryptKey]);

  function closeModal() {
    setOpen(false);
    router.push("/");
  }

  function validatePassKey(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      localStorage.setItem("accessKey", encryptedKey);
      router.push("/admin");

      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="space-y-5 bg-[#1A1D21] border-[#363A3D] outline-none !important">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex  items-start justify-between">
            Admin Access Vertification
            <Image
              src="/assets/icons/close.svg"
              alt="close button"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passKey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup className=" w-full flex justify-between !important">
              <InputOTPSlot
                className="text-[36px] leading-[40px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-16 gap-4 !important;"
                index={0}
              />
              <InputOTPSlot
                className="text-[36px] leading-[40px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-16 gap-4 !important;"
                index={1}
              />
              <InputOTPSlot
                className="text-[36px] leading-[40px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-16 gap-4 !important;"
                index={2}
              />
              <InputOTPSlot
                className="text-[36px] leading-[40px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-16 gap-4 !important;"
                index={3}
              />
              <InputOTPSlot
                className="text-[36px] leading-[40px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-16 gap-4 !important;"
                index={4}
              />
              <InputOTPSlot
                className="text-[36px] leading-[40px] font-bold justify-center flex border border-[#363A3D] rounded-lg size-16 gap-4 !important;"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="text-red-400 text-[14px] leading-[14px] mt-4 flex justify-center !important">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePassKey(e)}
            className=" bg-green-500 text-white !important w-full"
          >
            Enter Admin Panel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
