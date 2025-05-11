import { Heading } from "@project/components";
import { PageLayout } from "@project/components/layouts";
import { useDocumentTitle } from "@project/hooks";

export const FinancialPlanPage = () => {
  const pageTitle = "My Financial Plans";
  useDocumentTitle(pageTitle);
  return (
    <PageLayout>
      <Heading heading={pageTitle} />
    </PageLayout>
  );
};
