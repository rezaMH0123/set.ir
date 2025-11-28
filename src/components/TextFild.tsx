"use client";
import { InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type TextFieldProps = {
  name: string;
  label?: string;
  textAlign?: "left" | "right";
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({
  name,
  label,
  type,
  textAlign = "left",
  className,
  ...rest
}: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full relative">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-bold text-[#262626]"
        >
          {label}
        </label>
      )}

      <div className={`relative ${label ? "mt-2" : ""}`}>
        <input
          id={name}
          type={isPassword && showPassword ? "text" : type}
          {...register(name)}
          {...rest}
          className={`block w-full rounded-lg border border-[#D9D9D9] p-2 pl-4 pr-10 outline-none focus:outline-none ${className}
           ${textAlign === "right" ? "text-right" : "text-left"} 
          ${
            errors[name] ? "border-red-500" : ""
          } placeholder-[#D9D9D9] placeholder-left`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-2">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}
