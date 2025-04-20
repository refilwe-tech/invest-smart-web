import { Container, PageLayout } from "../../layouts";
import { useQuery } from "@tanstack/react-query";
import { dashboardService, financialService } from "../../../services";
import { TfiStatsUp } from "react-icons/tfi";
import { HiOutlineUserGroup, HiUsers } from "react-icons/hi";
import { ClipLoader } from "react-spinners";

import { USER_ROLES, useUserStore } from "../../../store/user-store";
import { useAuthStore } from "../../../store";
import { BsPiggyBankFill } from "react-icons/bs";

import { LineGraph } from "@project/components/common/line-graph";
import { COLORS, Heading, PieGraph } from "@project/components";

export const HomePage = () => {
  const { user } = useUserStore();
  const { token } = useAuthStore();
  const { data: financialData } = useQuery({
    queryKey: ["financialData"],
    queryFn: () => financialService.getFinancialGraph(user?.id ?? ""),
    enabled: !!token && user.userRole === USER_ROLES.USER,
  });

  const graph = [
    { name: "Salary", value: 18000 },
    { name: "Expenses", value: 2300 },
    { name: "Loans", value: 1780 },
    { name: "Savings/Investments", value: 5000 },
  ];
  const { data, isLoading } = useQuery({
    queryKey: ["counts"],
    queryFn: () => dashboardService.getCounts(token ?? ""),
    enabled: !!token && user.userRole !== USER_ROLES.USER,
  });

  return (
    <PageLayout isLoading={isLoading}>
      <section>
        <h3 className="text-lg">
          Welcome back, <strong>{`${user?.firstName ?? ""}`}</strong>
        </h3>
        <p className="text-sm">
          {user?.userRole === USER_ROLES.USER
            ? "See how your money will grow"
            : "See how your company is performing"}
        </p>
      </section>
      {isLoading ? (
        <section className="flex justify-center gap-2">
          <ClipLoader className=" text-primary" /> Loading...
        </section>
      ) : [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN].includes(user.userRole) ? (
        <>
          <section className="flex gap-4 w-full">
            {USER_ROLES.SUPER_ADMIN === user?.userRole && (
              <Container>
                <>
                  <section className="flex justify-between items-center">
                    <h4 className="text-2xl text-center">Total Admins</h4>
                    <HiOutlineUserGroup className="w-5 h-5" />
                  </section>
                  <section className="flex flex-col gap-1 justify-center items-center p-4">
                    <h2 className="text-center font-medium text-7xl">
                      {data?.totalAdmins}
                    </h2>
                    <p>Total Active Admins</p>
                  </section>
                </>
              </Container>
            )}
            <Container>
              <>
                <section className="flex justify-between items-center">
                  <h4 className="text-2xl text-center">Total Users</h4>
                  <HiUsers className="w-5 h-5" />
                </section>
                <section className="flex flex-col gap-1 justify-center items-center p-4">
                  <h2 className="text-center font-medium text-7xl">
                    {data?.totalUsers}
                  </h2>
                  <p>Total Active Users</p>
                </section>
              </>
            </Container>
            <Container>
              <>
                <section className="flex justify-between items-center">
                  <h4 className="text-2xl text-center">
                    Total Investment Options
                  </h4>
                  <TfiStatsUp className="w-5 h-5" />
                </section>
                <section className="flex flex-col gap-1 justify-center items-center p-4">
                  <h2 className="text-center font-medium text-7xl">
                    {data?.totalInvestments}
                  </h2>
                  <p>Total Active Banks</p>
                </section>
              </>
            </Container>
          </section>
          <section className="grid place-items-center w-4/5">
            <LineGraph
              data={
                /* data?.graphData ??  */ [
                  {
                    name: "Jan",
                    amount: 0,
                  },
                  {
                    name: "Feb",
                    amount: 4,
                  },
                  {
                    name: "Mar",
                    amount: 2,
                  },
                  {
                    name: "Apr",
                    amount: 5,
                  },
                  {
                    name: "May",
                    amount: 3,
                  },
                  {
                    name: "Jun",
                    amount: 7,
                  },
                  {
                    name: "Jul",
                    amount: 1,
                  },
                  {
                    name: "Aug",
                    amount: 6,
                  },
                  {
                    name: "Sep",
                    amount: 4,
                  },
                  {
                    name: "Oct",
                    amount: 8,
                  },
                  {
                    name: "Nov",
                    amount: 9,
                  },
                  {
                    name: "Dec",
                    amount: 10,
                  },
                ]
              }
            />
          </section>
        </>
      ) : (
        <section className="flex flex-col gap-4">
          <section className="grid md:grid-cols-3 gap-4 w-full">
            <section className="flex flex-col p-3 h-32 bg-primary hover:bg-dark text-white rounded-xl gap-4 drop-shadow-2xl">
              <h4 className="font-semibold text-sm">Invest Smart</h4>
              <p></p>
            </section>
            <section className="flex flex-col p-3 h-32 hover:bg-secondary/80 bg-secondary text-white rounded-xl gap-4 drop-shadow-2xl">
              <h4 className="font-semibold text-sm">Analyze your profile</h4>
              <p></p>
            </section>
            <section className="grid w-full place-items-start p-3 h-32 hover:bg-dark bg-tertiary text-white rounded-xl gap-4 drop-shadow-2xl">
              <section className="flex gap-2 items-center">
                <BsPiggyBankFill className="text-primary w-5 h-5" />
                <h4 className="font-semibold text-sm">Grow your money</h4>
              </section>
              <p className="text-xs"></p>
            </section>
          </section>
          <Heading heading="My Finances" />
          <section className="w-full h-80 flex items-center drop-shadow-2xl rounded-xl bg-white">
            <PieGraph data={financialData?.categories ?? []} />
            <section className="flex flex-col w-full gap-2">
              <ul className="flex flex-col gap-2">
                {
                  financialData?.categories?.map(({name},index:number) => (
                    <li
                      key={name}
                      className="flex text-xs gap-2 items-center"
                    >
                      <div
                        className="rounded-full h-5 w-5"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      {name}
                    </li>
                  ))
                }
              </ul>
            </section>
          </section>
        </section>
      )}
    </PageLayout>
  );
};
