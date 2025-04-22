import { useQuery } from "@tanstack/react-query";
import { MdOutlineSavings } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoReceiptOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

import {
  Button,
  Container,
  EditButton,
  FinanceCard,
  Heading,
  PageLayout,
} from "@project/components";
import { userProfileModel, financialService} from "@project/services";
import { useUserStore } from "@project/store/user-store";
import { Outlet, useNavigate } from "@tanstack/react-router";

export const MyFinancesPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { data , isLoading } = useQuery({
    queryKey: ["financialProfile"],
    queryFn: () => financialService.getUserFinancialProfile(user?.id ?? ""),
    enabled: !!localStorage.getItem("token"),
    select: userProfileModel,
  });

  const addFinancialInfo = () => navigate({ to: "/finances/new", from: "/" });
  const editFinancialInfo = () => 
    navigate({ to: "/finances/edit", from: "/" });

  return (
   <PageLayout isLoading={isLoading}>
      <Heading heading="My Finances" />
      {data?.profileId ? (
        <EditButton title="Finances" onClick={editFinancialInfo} isEdit={false} />
      ) : (
        <Button variant="clear" onClick={addFinancialInfo}>
          <section className="flex items-center gap-2">
            <CiCirclePlus /> Add Financial Info
          </section>
        </Button>
      )}
      <Container color="bg-gray-100">
        <section className="grid place-items-center gap-3">
          <section className="flex flex-col items-center gap-1">
            <h3 className="text-lg font-semibold text-gray-700">Your Net</h3>
            <p className="text-2xl font-bold text-primary">
              R{data?.netSalary ?? "0.00"}
            </p>
          </section>
          <section className="flex flex-col items-center gap-2">
           
            <h3 className="text-lg font-semibold text-gray-700">🏆 Your Goal 🏆</h3>
            <p className="text-sm font-bold text-gray-500">
              {data?.investmentGoal ?? "No goal set yet."}
            </p>
          </section>
        </section>
      </Container>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FinanceCard
          icon={<FcMoneyTransfer className="w-10 h-10" />}
          total={data?.grossSalary??"0.00"}
          title="Gross Salary"
          description={"Total income earned before taxes and deductions."}
          updated={!!data?.profileId}
        />
        <FinanceCard
          icon={<MdOutlineSavings className="w-10 h-10" />}
          total={data?.currentSavings??"0.00"}
          title="Current Savings"
          description={"Total amount of money you have set aside in savings."}
          updated={!!data?.profileId}
        />
        <FinanceCard
          icon={<IoReceiptOutline className="w-10 h-10" />}
          total={data?.monthlyExpenses ?? "0.00"}
          title="Monthly Expenses"
          description={"Total costs for each month, including rent, groceries etc."}
          updated={!!data?.profileId}
        />
      </section>
      <Outlet />
    </PageLayout>
  );
};
