import { FC } from "react";

type HeadingProps = {
  heading:string
}
export const Heading:FC<HeadingProps> = ({ heading }) => {
  return (
    <header className="flex flex-col gap-3">
      <h1 className="text-4xl text-primary font-bold">{heading}</h1>
      <section className="bg-gradient-to-r from-secondary to-white h-1 w-16" />
    </header>
  );
};


