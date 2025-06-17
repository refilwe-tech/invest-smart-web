import { Heading, type Plan, Table } from "@project/components";
import { Container, PageLayout } from "@project/components/layouts";
import { useDocumentTitle } from "@project/hooks";
import { createColumnHelper } from "@tanstack/react-table";
import { investmentService } from "@project/services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@project/components/ui/card";
import { EyeIcon } from "lucide-react";
import { type FC, useState } from "react";
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
            className="flex items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
            View Plan <EyeIcon />
          </button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Title</DialogTitle>
                <DialogDescription>
                  Give your plan a name to save it for future reference.
                </DialogDescription>
              </DialogHeader>
              <Plans {...(row.original as Plan)} />
              <DialogFooter>Info</DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ),
    }),
  ];

  const Plans: FC<Plan> = ({ ...plan }) => {
    return (
      <div>
        {isLoading ? (
          <p>Loading your plans...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card key={plan.plan_id}>
              <CardHeader>
                <CardTitle>{plan.plan_name}</CardTitle>
                <p className="text-sm text-gray-600">
                  Created on {new Date(plan.created_at)?.toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Total Invested</p>
                  <p className="text-xl font-bold">R{plan.totalInvested}</p>
                </div>

                <h4 className="font-medium mb-2">Investments</h4>
                <div className="space-y-2">
                  {/* {plan?.items?.map((item) => (
                    <div
                      key={item.investment_id}
                      className="border-b pb-2 last:border-b-0"
                    >
                      <div className="flex justify-between">
                        <p className="font-medium">{item.name}</p>
                        <p>R{item?.amount?.toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {item?.type} • {item?.risk_level} risk •{" "}
                        {item?.expected_return}% return
                      </p>
                    </div>
                  ))} */}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  return (
    <PageLayout isLoading={isLoading}>
      <Heading heading={pageTitle} />
      <Container>
        <Table data={data?.plans ?? []} columns={columns} />
      </Container>
    </PageLayout>
  );
};
