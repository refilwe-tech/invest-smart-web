import { FC } from "react";
import { AnyFieldApi } from "@tanstack/react-form";

import { FieldInfo } from "./field-info";

export type InputFieldProps = {
  field: AnyFieldApi;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
};

export const InputField: FC<InputFieldProps> = ({
  field,
  label = "",
  type = "text",
}) => {
  return (
    <section id="input-field">
      <input
        type={type}
        id={field.name}
        name={field.name}
        placeholder={label}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="placeholder:text-gray-300 w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
      />
      <FieldInfo field={field} />
    </section>
  );
};
