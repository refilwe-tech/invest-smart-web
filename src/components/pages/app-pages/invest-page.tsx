import { InvestForm } from "@project/components";
import { Heading } from "@project/components/common";

export const InvestPage = () => {
  return (
    <section className="flex flex-col gap-2">
      <Heading heading="Invest" />
      <InvestForm initialValues={{
        age:0,
        gross_salary:0,
        net_salary:0
      }}/>
    </section>
  );
};
