import { Heading, InvestForm } from "@project/components";
import { userProfileModel, userService } from "@project/services";
import { useUserStore } from "@project/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { MdOutlineCloseFullscreen } from "react-icons/md";

export const AddFinancesPage = () => {
  const location = useLocation();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["financialProfile"],
    queryFn: () => userService.getUserProfileById(user?.id ?? ""),
    enabled: !!localStorage.getItem("token"),
    select: userProfileModel,
  });
  
  const { pathname } = location;
  const isOpen = pathname == "/finances/new" || pathname == "/finances/edit";
  const isEdit = pathname == "/finances/edit";
  const close = () => navigate({ to: "/finances", from: "/" });
  const initialValues = data ??{
    grossSalary: "0",
    monthlyExpenses: "0",
    netSalary: "0",
    currentSavings: "0",
    investmentGoal: "",
    userId: user?.id ?? "",
    profileId: "",
  };
  return (
    <section
      className={`fixed flex flex-col gap-4 h-screen py-4 px-3 top-0 bottom-0 bg-slate-50 right-0 w-300 z-50 transition-all duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } sm:w-full sm:max-w-md`}
    >
      <button className="absolute top-0 right-0 p-5" onClick={close}>
        <MdOutlineCloseFullscreen className="w-8 h-8 hover:text-primary-dark" />
      </button>
      <Heading heading={`${isEdit?'Edit':"Add"} Financial Data`} />
      <InvestForm initialValues={initialValues} isEdit={isEdit} />
    </section>
  );
};
