import { Heading, type Plan, PlanDetails, Table } from "@project/components";
import { Container, PageLayout } from "@project/components/layouts";
import { useDocumentTitle } from "@project/hooks";
import { createColumnHelper } from "@tanstack/react-table";
import { investmentService } from "@project/services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@project/components/ui/dialog";

export const FinancialPlanPage = () => {
  const [selectedPlanId, setSelectedPlanId] = useState({
    plan_id: 0,
    plan_name: "",
    created_at: "",
  });
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
        <button
          type="button"
          title="view"
          className="flex text-primary text-sm items-center gap-2"
          onClick={() => {
            setSelectedPlanId({
              plan_id: row.original.plan_id,
              plan_name: row.original.plan_name,
              created_at: row.original.created_at,
            });
            setIsOpen(true);
          }}
        >
          View Plan <EyeIcon />
        </button>
      ),
    }),
  ];

  return (
    <PageLayout isLoading={isLoading}>
      <Heading heading={pageTitle} />
      <Container>
        <Table data={data?.plans ?? []} columns={columns} />
      </Container>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="">
          {selectedPlanId && (
            <PlanDetails
              created_at={selectedPlanId.created_at}
              name={selectedPlanId.plan_name}
              id={selectedPlanId.plan_id}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};
