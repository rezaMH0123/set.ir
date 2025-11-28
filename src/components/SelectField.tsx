import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Image from "next/image";
import { baseIcons } from "@/assets/icons";
import { SelectOptionsType } from "@/types/dashboard.type";

interface SelectFieldProps {
  id: string;
  label: string;
  options: SelectOptionsType[];
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export default function SelectField({
  id,
  label,
  options,
  register,
  error,
}: SelectFieldProps) {
  return (
    <div>
      <div className="relative w-full grid gap-y-2">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <select
          id={id}
          {...register}
          className={`w-full h-11 shadow-[0_0px_4px_0_rgba(0,0,0,0.25)] rounded-lg bg-[#F6F6F6] pr-4 focus:outline-0 appearance-none ${
            error ? "border border-red-500" : ""
          }`}
        >
          <option value="">{label}</option>
          {options.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <div className="absolute left-2 bottom-[10px] flex justify-center items-center pointer-events-none">
          |
          <Image src={baseIcons.arrowDownIcon} alt="arrow" className="mx-2" />
        </div>
      </div>
      <p className="text-red-500 text-sm h-6 mt-2">{error && error.message}</p>
    </div>
  );
}
