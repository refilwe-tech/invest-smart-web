import { useState } from "react";

import { Heading } from "@project/components/common";
import { PageLayout } from "@project/components/layouts";

export const InvestPage = () => {
  const [showResults, setShowResults] = useState(false);
  return (
    <PageLayout>
        <Heading heading="Investment Analyses" />
      <section className="flex flex-col gap-2">
      </section>
    </PageLayout>
  );
};
