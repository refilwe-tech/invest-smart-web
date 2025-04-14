import { FC, ReactNode } from "react";

export type ContainerProps = {
  children: ReactNode,
  color?:string
}
export const Container:FC<ContainerProps> = ({ children, color = "bg-gray-50" }) => {
  return (
    <section className={`${color} drop-shadow-lg border-gray-100 w-full rounded-xl p-5`}>
      {children}
    </section>
  );
};
