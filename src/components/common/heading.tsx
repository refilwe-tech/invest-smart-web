import { FC } from "react";

type HeadingProps = {
  heading:string
}
export const Heading:FC<HeadingProps> = ({ heading }) => {
  return (
    <header className="flex flex-col gap-3 place-items-center w-full">
      <h1 className="text-4xl text-primary text-center font-bold">{heading}</h1>
      <section className="bg-gradient-to-r text-center from-blue-400 to-white h-1 w-16" />
    </header>
  );
};


