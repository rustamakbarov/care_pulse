"use client";

import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./froms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="AZ"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="form-item-tel-input mt-2 h-11 rounded-md pl-3 text-sm border bg-[#1A1D21] placeholder:text-[#76828D] border-[#363A3D] !important"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border dorder-[#363A3D] bg-[#1A1D21]">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            height={24}
            className="ml-2"
            width={24}
          />

          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={props.dateFormat ?? "dd/MM/yyyy"}
              showTimeSelect={props.showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="overflow-hidden border-transparent w-full placeholder:text-[#76828D]  h-11 text-[14px] leading-[18px] font-medium rounded-md px-3 outline-none !important"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            disabled={props.disabled}
            className=" bg-[#1A1D21] placeholder:text-[#76828D] border-[#363A3D] focus-visible:ring-0 focus-visible:ring-offset-0 !important"
          />
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor={props.name}
              className="cursor-pointer text-sm font-medium text-[#ABB8C4] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-[#1A1D21]  placeholder:text-[#76828D] border-[#363A3D] h-11 focus:ring-0 focus:ring-offset-0 !important">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="bg-[#1A1D21] border-[#363A3D] !important">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.INPUT:
      return (
        <div className="flex h-11 rounded-md border border-[#363A3D] bg-[#1A1D21]">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={props.placeholder}
              className="border-0 bg-[#1A1D21] placeholder:text-[#76828D] border-[#363A3D] h-[42.5px] focus-visible:ring-0 focus-visible:ring-offset-0 !important"
            />
          </FormControl>
        </div>
      );
  }
};

export default function CustomFormField(props: CustomProps) {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="text-red-400 !important" />
        </FormItem>
      )}
    />
  );
}
