import type { FC, PropsWithChildren } from "react";

export interface PageLayoutProps extends PropsWithChildren {
  isLoading?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  isLoading = false,
}) => {
  return <section className="flex py-4 flex-col gap-3">{children}</section>;
};
