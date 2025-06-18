import { Heading, type Plan, PlanDetails, Table } from "@project/components";
import { Container, PageLayout } from "@project/components/layouts";
import { useDocumentTitle } from "@project/hooks";
import { createColumnHelper } from "@tanstack/react-table";
import { investmentService } from "@project/services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@project/components/ui/dialog";

export const FinancialPlanPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pageTitle = "My Financial Plans";
  useDocumentTitle(pageTitle);
  const { data, isLoading } = useQuery({
    queryKey: ["user-plans"],
    queryFn: () => investmentService.getUserPlans(),
    retry: false,
  });

  const columnHelper = createColumnHelper<Plan>();
  const columns = [
    columnHelper.accessor("plan_id", {
      header: "Investment ID",
    }),
    columnHelper.accessor("plan_name", {
      header: "Plan Name",
    }),
    columnHelper.accessor("created_at", {
      header: "Created At",
      cell: (info) => dayjs(info.getValue()).format("YYYY-MM-DD HH:mm:ss"),
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <>
          <button
            type="button"
            title="view"
            className="flex text-primary text-sm items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
            View Plan <EyeIcon />
          </button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{`${row.original.plan_name} Plan`}</DialogTitle>
                <DialogDescription>
                  More details about your financial plan.
                </DialogDescription>
              </DialogHeader>
              <PlanDetails {...row.original} />
              <DialogFooter className="text-xs text-center text-black">
                This information is a predicted data based on your input, true
                results may vary.
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ),
    }),
  ];

  return (
    <PageLayout isLoading={isLoading}>
      <Heading heading={pageTitle} />
      <Container>
        <Table data={data?.plans ?? []} columns={columns} />
      </Container>
    </PageLayout>
  );
};
