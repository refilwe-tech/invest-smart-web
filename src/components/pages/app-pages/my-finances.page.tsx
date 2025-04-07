import { Heading, InvestForm } from "@project/components";

export const MyFinancesPage = () => {
  return (
    <section className="flex flex-col gap-2">
      <Heading heading="My Finances" />
      <InvestForm/>
    </section>
  );
};
