import { Heading } from "@project/components/common";
import { PageLayout } from "@project/components/layouts";

export const InvestPage = () => {
  return (
    <PageLayout>
      <section className="flex flex-col gap-2">
        <Heading heading="Financial Calculator" />
      </section>
    </PageLayout>
  );
};
