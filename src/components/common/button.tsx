import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "outline" | "clear" | "solid" | "gradient" | "circle"|'negative';
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = "outline",
  className = "",
  ...rest
}) => {
  // Styles for the outer button container
  let containerStyle = "relative p-[2px] overflow-hidden rounded-lg group";
  
  // Styles for the background layer
  let backgroundStyle = "";
  
  // Styles for the content container
  let contentContainerStyle = "relative px-6 py-2 transition-all duration-300";
  
  // Styles for the text content
  let contentStyle = "font-medium";
  
  switch (variant) {
    case "outline":
      backgroundStyle = "bg-gradient-to-r from-secondary-2 to-primary-dark";
      contentContainerStyle += " dark:bg-tertiary rounded-md group-hover:bg-transparent";
      contentStyle += " text-transparent bg-clip-text bg-gradient-to-r from-secondary-2 to-primary-dark group-hover:text-white";
      break;
      
    case "clear":
      containerStyle = "relative overflow-hidden group";
      backgroundStyle = "bg-transparent";
      contentContainerStyle += " bg-transparent";
      contentStyle += " text-black hover:text-primary-dark";
      break;
      
    case "solid":
      containerStyle = "relative overflow-hidden rounded-lg group";
      backgroundStyle = "bg-tertiary";
      contentContainerStyle += " bg-transparent";
      contentStyle += " text-white";
      break;

      case "negative":
        containerStyle = "relative overflow-hidden rounded-lg group";
        backgroundStyle = "bg-red-500 ";
        contentContainerStyle += " bg-transparent hover:bg-red-700";
        contentStyle += " text-white";
        break;
      
    case "gradient":
      backgroundStyle = "bg-gradient-to-r from-secondary-2 to-primary-dark hover:bg-gradient-to-r hover:from-primary-dark hover:to-secondary";
      contentContainerStyle += " bg-transparent";
      contentStyle += " text-white";
      break;
      
    case "circle":
      containerStyle = "relative p-[2px] overflow-hidden rounded-full group";
      backgroundStyle = "bg-gradient-to-r from-secondary-2 to-primary-dark";
      contentContainerStyle += " rounded-full bg-transparent";
      contentStyle += " text-white";
      break;
      
    default:
      backgroundStyle = "bg-gradient-to-r from-secondary-2 to-primary-dark";
      contentContainerStyle += " dark:bg-tertiary rounded-md group-hover:bg-transparent";
      contentStyle += " text-transparent bg-clip-text bg-gradient-to-r from-secondary-2 to-primary-dark group-hover:text-white";
      break;
  }

  return (
    <button
    disabled={rest.disabled}
      onClick={onClick}
      className={`${containerStyle} ${className}`}
      {...rest}
    >
      <div className={`absolute inset-0 ${rest.disabled ? "bg-gray-400" : backgroundStyle}`}/>
      <div className={contentContainerStyle}>
        <span className={contentStyle}>
          {children}
        </span>
      </div>
    </button>
  );
};