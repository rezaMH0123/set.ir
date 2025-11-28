"use client";
import { TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ name, label, ...rest }: TextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full relative">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-bold text-black1 mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          id={name}
          {...register(name)}
          {...rest}
          className={`block w-full rounded-2xl border border-LightGray p-2 px-4 outline-none
           focus:outline-none text-right text-xs md:text-sm
          ${
            errors[name] ? "border-red-500" : ""
          } placeholder-LightGray placeholder-right resize-none`}
        />
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-2">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}
