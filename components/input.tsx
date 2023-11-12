import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price" | "password";
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
}

export default function Input({
  label,
  name,
  kind = "text",
  register,
  type,
  required,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === "text" ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700"
          />
        </div>
      ) : null}
      {kind === "password" ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700"
          />
        </div>
      ) : null}
      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700">
            +82
          </span>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700"
          />
        </div>
      ) : null}
    </div>
  );
}
