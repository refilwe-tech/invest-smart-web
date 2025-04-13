import { FC, ReactNode } from "react";

export type ContainerProps = {
  children: ReactNode,
  color?:string
}
export const Container:FC<ContainerProps> = ({ children, color = "bg-white" }) => {
  return (
    <section className={`${color} drop-shadow-lg border-gray-100 w-full rounded-xl p-5`}>
      {children}
    </section>
  );
};
