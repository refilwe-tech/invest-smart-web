import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { MdOutlineCloseFullscreen } from "react-icons/md";

import { FinancesForm, Heading, PageLayout } from "@project/components";
import { financialService, userProfileModel } from "@project/services";
import { useUserStore } from "@project/store/user-store";
import { useDocumentTitle } from "@project/hooks";

export const EditFinancesPage = () => {
  const pageTitle = "Edit Financial Data";
  useDocumentTitle(pageTitle);
  const location = useLocation();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["financialProfile"],
    queryFn: () => financialService.getUserFinancialProfile(user?.id ?? ""),
    enabled: !!localStorage.getItem("token"),
    select: userProfileModel,
    retry: 1,
  });

  const initialValues = data?? {
    grossSalary: 0,
    monthlyExpenses: 0,
    netSalary: 0,
    currentSavings: 0,
    investmentGoal: "",
    userId: Number(user?.id) ?? -1,
    profileId: 0,
  };

  const { pathname } = location;
  const isOpen = pathname === "/finances/edit";
  const isEdit = pathname === "/finances/edit";
  const close = () => navigate({ to: "/finances", from: "/" });

  return (
    <PageLayout>
      <section
        className={`fixed flex flex-col gap-4 h-screen py-4 px-3 top-0 bottom-0 bg-slate-50 right-0 w-300 z-50 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:w-full sm:max-w-md`}
      >
        <button type="button" className="absolute top-0 right-0 p-5" onClick={close}>
          <MdOutlineCloseFullscreen className="w-8 h-8 hover:text-primary-dark" />
        </button>
        <Heading heading={pageTitle} />
        <FinancesForm initialValues={initialValues} isEdit={isEdit} />
      </section>
    </PageLayout>
  );
};
