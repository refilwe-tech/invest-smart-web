import { Heading, Table } from "@project/components";
import { Container, PageLayout } from "@project/components/layouts";
import { useDocumentTitle } from "@project/hooks";
import { createColumnHelper } from "@tanstack/react-table";
import { useUserStore } from "@project/store";
import { UserApi } from "@project/services";

export const FinancialPlanPage = () => {
  const pageTitle = "My Financial Plans";
  useDocumentTitle(pageTitle);

  const columnHelper = createColumnHelper<UserApi>();
  const columns = [
    columnHelper.accessor("user_id", {
      header: "ID",
    }),
    columnHelper.accessor("first_name", {
      header: "Plan Name",
    }),
    columnHelper.accessor("last_name", {
      header: "Return Estimate",
    }),
  ];

  return (
    <PageLayout>
      <Heading heading={pageTitle} />
      <Container>
        <Table data={[]} columns={columns} />
      </Container>
    </PageLayout>
  );
};
