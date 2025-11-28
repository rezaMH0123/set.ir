import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  disabled?: boolean;
}

export default function InputField({
  id,
  label,
  placeholder,
  register,
  error,
  type = "text",
  disabled = false,
}: InputFieldProps) {
  return (
    <div className="w-full grid gap-y-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
        className={`w-full h-11 shadow-[0_0px_4px_0_rgba(0,0,0,0.25)] rounded-lg bg-[#F6F6F6] pr-4 focus:outline-0 ${
          error ? "border border-red-500" : ""
        }`}
        disabled={disabled}
      />
      <p className="text-red-500 text-sm h-6">{error && error.message}</p>
    </div>
  );
}
