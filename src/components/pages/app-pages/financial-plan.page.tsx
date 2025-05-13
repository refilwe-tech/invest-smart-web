import { Heading, Table } from "@project/components";
import { Container, PageLayout } from "@project/components/layouts";
import { useDocumentTitle } from "@project/hooks";
import { createColumnHelper } from "@tanstack/react-table";
import { investmentService, UserApi } from "@project/services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export const FinancialPlanPage = () => {
  const pageTitle = "My Financial Plans";
  useDocumentTitle(pageTitle);
  const {data, isLoading} = useQuery({
    queryKey: ["user-plans"],
    queryFn: () => investmentService.getUserPlans(),
    retry: false,
  })

  console.log("data", data);

  const columnHelper = createColumnHelper<UserApi>();
  const columns = [
    columnHelper.accessor("plan_id", {
      header: "ID",
    }),
    columnHelper.accessor("plan_name", {
      header: "Plan Name",
    }),
    columnHelper.accessor("created_at", {
      header: "Created At",
      cell:(info) => dayjs(info.getValue()).format("YYYY-MM-DD HH:mm:ss"),
    }),
  ];

  return (
    <PageLayout>
      <Heading heading={pageTitle} />
      <Container>
        <Table data={data?.plans ?? []} columns={columns} />
      </Container>
    </PageLayout>
  );
};
