import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
} from "@project/components";
import { userProfileModel, userService } from "@project/services";
import { useUserStore } from "@project/store/user-store";
import { Outlet, useNavigate } from "@tanstack/react-router";

export const MyFinancesPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["financialProfile"],
    queryFn: () => userService.getUserProfileById(user?.id ?? ""),
    enabled: !!localStorage.getItem("token"),
    select: userProfileModel,
  });

  const addFinancialInfo = () => navigate({ to: "/finances/new", from: "/" });
  const editFinancialInfo = () => 
    navigate({ to: "/finances/edit", from: "/" });

  return (
    <section className="flex flex-col gap-3">
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
      <Container>
        <section className="grid place-items-center gap-3">
          <section className="flex flex-col items-center gap-1">
            <h3 className="text-lg font-semibold text-gray-700">Your Net</h3>
            <p className="text-2xl font-bold text-primary">
              {data?.netSalary ?? "0.00"}
            </p>
          </section>
          <section className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-700">Your Goal</h3>
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
          lastUpdatedAt={""}
          updated={!!data?.profileId}
        />
        <FinanceCard
          icon={<MdOutlineSavings className="w-10 h-10" />}
          total={data?.currentSavings??"0.00"}
          title="Current Savings"
          lastUpdatedAt={""}
          updated={!!data?.profileId}
        />
        <FinanceCard
          icon={<IoReceiptOutline className="w-10 h-10" />}
          total={data?.monthlyExpenses ?? "0.00"}
          title="Monthly Expenses"
          lastUpdatedAt={""}
          updated={!!data?.profileId}
        />
      </section>
      <Outlet />
    </section>
  );
};
