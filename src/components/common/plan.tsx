import type { FC } from "react";
import type { Plan } from "../pages";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BsInfoCircleFill } from "react-icons/bs";

export const PlanDetails: FC<Plan> = ({ ...plan }) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Name: {plan?.plan_name}</CardTitle>
            <p className="text-sm text-gray-600">
              Created on {new Date(plan?.created_at)?.toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Total Invested</p>
              <p className="text-xl font-bold">R{plan?.totalInvested}</p>
            </div>
            <hr />
            <div className="space-y-2">
              <div className="border-b pb-2 last:border-b-0">
                <div className="flex justify-between">
                  <p className="font-medium">Plan Duration</p>
                  <p>{plan?.duration_months?.toLocaleString()} Months</p>
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
        </Card>
      </div>
    </div>
  );
};
