import type { FC } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";

import { FieldInfo } from "./field-info";

export type InputFieldProps = {
  disabled?: boolean;
  field: AnyFieldApi;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  maxLength?: number;
};

export const InputField: FC<InputFieldProps> = ({
  field,
  maxLength,
  label = "",
  type = "text",
  disabled = false,
}) => {
  return (
    <section id="input-field w-full flex flex-col">
      <label className="text-xs" htmlFor={field?.name}>{label}</label>
      <input
      maxLength={maxLength}
        disabled={disabled}
        type={type}
        id={field.name}
        name={field.name}
        placeholder={(type === "password" ? "************" : label)}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="placeholder:text-gray-300 w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
      />
      <FieldInfo field={field} />
    </section>
  );
};
