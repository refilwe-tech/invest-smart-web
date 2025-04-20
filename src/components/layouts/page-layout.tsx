import { FC, PropsWithChildren } from "react";

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <section className="flex py-4 flex-col gap-3">{children}</section>;
};
