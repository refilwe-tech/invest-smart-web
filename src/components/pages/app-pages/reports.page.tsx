import { Button, Heading } from "@project/components/common";
import { Container, PageLayout } from "@project/components/layouts";
import { useDocumentTitle } from "@project/hooks";
import { useDetailedReport } from "@project/queries";
import { useQuery } from "@tanstack/react-query";
import { reportService } from "../../../services";

import { HiOutlineUserGroup, HiUsers } from "react-icons/hi2";
import { TfiStatsUp } from "react-icons/tfi";

export const ReportsPage = () => {
  useDocumentTitle("Detailed Report");
  const { data } = useQuery({
    queryKey: ["businessReport"],
    queryFn: reportService.getBusinessReport,
  });

  console.log(data);
  const { mutateAsync: detailedReportAsyn } = useDetailedReport();
  const handleDetailedReport = async () => {
    try {
      const response = await detailedReportAsyn({
        template_id: 1,
        period_start: "2023-01-01",
        period_end: "2023-12-31",
        user_id: 1,
        filters: {
          investment_type: "stocks",
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error generating detailed report:", error);
    }
  };

  return (
    <PageLayout>
      <Heading heading="Reports" />
      <p className="text-xs font-semibold">
        Here's a Detailed Report for InvestSmart
      </p>
      <section className="flex justify-end items-center">
        <Button variant="gradient" onClick={handleDetailedReport}>
          Export Report
        </Button>
      </section>
      <section className="flex gap-4 w-full">
        <Container color="bg-primary">
          <>
            <section className="flex justify-between items-center ">
              <h4 className="text-2xl text-center">Total Admins</h4>
              <HiOutlineUserGroup className="w-5 h-5" />
            </section>
            <section className="flex flex-col gap-1 justify-center items-center p-4">
              <h2 className="text-center font-medium text-7xl">
                {data?.counts.total_admins}
              </h2>
              <p>Total Active Admins</p>
            </section>
          </>
        </Container>
        <Container color="bg-secondary">
          <>
            <section className="flex justify-between items-center">
              <h4 className="text-2xl text-center">Total Clients</h4>
              <HiUsers className="w-5 h-5" />
            </section>
            <section className="flex flex-col gap-1 justify-center items-center p-4">
              <h2 className="text-center font-medium text-7xl">
                {data?.counts.total_users}
              </h2>
              <p>Total Active Clients</p>
            </section>
          </>
        </Container>
        <Container color="bg-primary-dark">
          <>
            <section className="flex justify-between items-center">
              <h4 className="text-2xl text-center">Total Investment Options</h4>
              <TfiStatsUp className="w-5 h-5" />
            </section>
            <section className="flex flex-col gap-1 justify-center items-center p-4">
              <h2 className="text-center font-medium text-7xl">
                {data?.counts.total_investments}
              </h2>
              <p>Total Active Banks</p>
            </section>
          </>
        </Container>
      </section>
    </PageLayout>
  );
};
