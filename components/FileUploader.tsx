"use client";

import { convertFileToUrl } from "@/lib/utills";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

export default function FileUploader({ files, onChange }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="text-12-regular flex cursor-pointer  flex-col items-center justify-center gap-3 rounded-md border border-dashed border-[#363A3D] bg-[#1A1D21] p-5"
    >
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="Image of document"
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="Upload image svg"
          />
          <div className="flex flex-col justify-center gap-2 text-center text-[#76828D]">
            <p className="text-[14px] leading-[18px] font-normal">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG,PNG,JPG or GIF (max 800x400)</p>
          </div>
        </>
      )}
    </div>
  );
}
