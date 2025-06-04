import {
  BarGraph,
  Button,
  Heading,
  PieGraph,
} from "@project/components/common";
import { Container, PageLayout } from "@project/components/layouts";
import { useDocumentTitle } from "@project/hooks";
import { useQuery } from "@tanstack/react-query";
import { reportService } from "../../../services";

import {
  HiOutlineArchiveBoxArrowDown,
  HiOutlineUserGroup,
  HiUsers,
} from "react-icons/hi2";
import ReactToPrint from "react-to-print";
import { TfiStatsUp } from "react-icons/tfi";
import { useRef } from "react";
import { USER_ROLES, useUserStore } from "@project/store";

export const ReportsPage = () => {
  useDocumentTitle("Detailed Report");
  const { data, isLoading } = useQuery({
    queryKey: ["businessReport"],
    queryFn: reportService.getBusinessReport,
  });
  const { user } = useUserStore();
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <section ref={contentRef}>
      <PageLayout isLoading={isLoading}>
        <Heading heading="Reports" />
        <p className="text-xs font-semibold">
          Here's a Detailed Report for InvestSmart
        </p>
        <section className="flex justify-end items-center">
          <ReactToPrint
            trigger={() => <Button variant="gradient"> Export Report</Button>}
            content={() => contentRef?.current}
          />
        </section>
        <section className="flex gap-4 w-full">
          {USER_ROLES.SUPER_ADMIN === user?.userRole && (
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
          )}
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
                <h4 className="text-2xl text-center">
                  Total Investment Options
                </h4>
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
        <Container className="flex flex-col w-full h-80 items-center rounded-xl bg-white">
          <section className="flex justify-between items-center">
            <h4 className="text-2xl text-center">Bank Interests</h4>
          </section>
          <BarGraph data={data?.banks_chart ?? []} />
        </Container>
        <Container className="w-full h-80 flex items-center rounded-xl bg-white">
          <PieGraph data={data?.plans_per_bank ?? []} />
          <section className="flex flex-col w-full gap-2">
            <Container>
              <>
                <section className="flex justify-between items-center">
                  <h4 className="text-2xl text-center">Total Plans</h4>
                  <HiOutlineArchiveBoxArrowDown className="w-5 h-5" />
                </section>
                <section className="flex flex-col gap-1 justify-center items-center p-4">
                  <h2 className="text-center font-medium text-7xl">
                    {data?.total_plans}
                  </h2>
                  <p>Total Saved Plans</p>
                </section>
              </>
            </Container>
          </section>
        </Container>
      </PageLayout>
    </section>
  );
};
