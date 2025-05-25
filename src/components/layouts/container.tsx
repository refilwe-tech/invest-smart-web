import type { FC, ReactNode } from "react";

export type ContainerProps = {
  children: ReactNode;
  color?: string;
  className?: string;
};
export const Container: FC<ContainerProps> = ({
  children,
  color = "bg-gray-50",
  className = "",
}) => {
  return (
    <section
      className={`drop-shadow-lg ${color} ${className} border-gray-100 w-full rounded-xl p-5`}
    >
      {children}
    </section>
  );
};
