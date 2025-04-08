import { EditButton, Heading, InvestForm } from "@project/components";
import { userService } from "@project/services";
import { useUserStore } from "@project/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const MyFinancesPage = () => {
  const { user } = useUserStore();
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useQuery({
    queryKey: ["financialProfile"],
    queryFn: () => userService.getUserProfileById(user?.id ?? ""),
    enabled: !!localStorage.getItem("token"),
  });

  console.log(data)
  const toggleEdit = () => setIsEdit(!isEdit);

  const initialValues = {
    grossSalary: 0,
    monthlyExpenses: 0,
    netSalary: 0,
    investmentGoal: "",
    userId: user?.id ?? "",
  };
  return (
    <section className="flex flex-col gap-2">
      <Heading heading="My Finances" />
       <EditButton title='Finances' onClick={toggleEdit} isEdit={isEdit} />
      <InvestForm initialValues={initialValues} isEdit={isEdit}/>
    </section>
  );
};
