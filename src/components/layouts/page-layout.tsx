import type { FC, PropsWithChildren } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export interface PageLayoutProps extends PropsWithChildren {
  isLoading?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  isLoading = false,
}) => {
  return isLoading? <section className="flex justify-center gap-2">
  <ClipLoader className=" text-primary" /> Loading...
</section>:<section className="flex py-4 flex-col gap-3 overflow-auto">{children}</section>;
};
