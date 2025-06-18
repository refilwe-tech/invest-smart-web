import type { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BsInfoCircleFill } from "react-icons/bs";
import { financialService } from "@project/services";
import { useQuery } from "@tanstack/react-query";

export const PlanDetails: FC<{
  id: number;
  name: string;
  created_at: string;
}> = ({ id, name, created_at }) => {
  const { data: plan } = useQuery({
    queryKey: ["plan-details", id],
    queryFn: () => financialService.getPlanDetails(id),
    retry: false,
  });
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        <Card className="px-4">
          <CardHeader>
            <CardTitle>Name: {name}</CardTitle>
            <p className="text-sm text-gray-600">
              Created on {new Date(created_at)?.toLocaleDateString()}
            </p>
          </CardHeader>
          <hr className="my-4" />
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Initial Investment</p>
              <p className="text-xl font-bold">R{plan?.amount ?? 0.0}</p>
            </div>
            {/*   <div className="mb-4">
              <p className="text-sm text-gray-600">Expected Return</p>
              <p className="text-xl font-bold">R{plan?.amount ?? 0.0}</p>
            </div> */}
            <hr />
            <div className="space-y-2">
              <div className="border-b pb-2 last:border-b-0">
                <div className="flex justify-between">
                  <p className="font-medium">Institution Name</p>
                  <p className="text-xs">{plan?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Institution Type</p>
                  <p className="text-xs">{plan?.type}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Plan Duration</p>
                  <p className="text-xs">
                    {plan?.expected_duration_months?.toLocaleString()} Months
                  </p>
                </div>
                <div className="flex justify-between items-center pt-10">
                  <p className="text-sm font-medium items-center gap-2 flex">
                    <BsInfoCircleFill className="text-primary" /> Users who
                    saved this plan:{" "}
                  </p>
                  <p> {plan?.usersSaved?.toLocaleString() ?? 0}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-gray-500">
            This information is a predicted data based on your input, true
            results may vary.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
