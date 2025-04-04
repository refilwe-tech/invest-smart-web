import { FC, PropsWithChildren } from "react";

export const GradientHeading: FC<PropsWithChildren> = ({ children }) => (
  <h1 className="font-extrabold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
    {children}
  </h1>
);
