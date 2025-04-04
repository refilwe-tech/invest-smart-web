import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "outline" | "clear" | "solid" | "gradient" | "circle";
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = "outline",
}) => {
  let btnVariantStyle = "";
  switch (variant) {
    case "outline":
      btnVariantStyle = "bg-gradient-to-r from-secondary-2 to-primary-dark";
      break;
    case "clear":
      btnVariantStyle = "bg-transparent text-white";
      break;
    case "solid":
      btnVariantStyle = "bg-primary text-white";
      break;
    case "gradient":
      btnVariantStyle =
        "bg-gradient-to-r from-secondary-2 to-primary-dark text-white";
      break;
    case "circle":
      btnVariantStyle =
        "bg-gradient-to-r from-secondary-2 to-primary-dark text-white rounded-full";
      break;
    default:
      btnVariantStyle = "bg-gradient-to-r from-secondary-2 to-primary-dark";
      break;
  }

  return (
    <button
      onClick={onClick}
      className="relative p-[2px] overflow-hidden rounded-lg group max-w-sm"
    >
      <div className={`absolute inset-0 ${btnVariantStyle} rounded-lg`}></div>

      <div className="relative px-6 py-2  dark:bg-tertiary rounded-md group-hover:bg-white transition-all duration-300">
        <span
          className={`font-medium text-transparent bg-clip-text ${btnVariantStyle}`}
        >
          {children}
        </span>
      </div>
    </button>
  );
};
