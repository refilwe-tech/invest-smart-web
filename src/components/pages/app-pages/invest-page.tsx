import { useState } from "react";

import { useForm } from "@tanstack/react-form";
import { Label } from "@project/components/ui/label";
import { Input } from "@project/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@project/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@project/components/ui/radio-group";
import { Button } from "@project/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@project/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heading, InputField } from "@project/components/common";
import { PageLayout } from "@project/components/layouts";
import {
  type InvestmentPlanResponse,
  investmentService,
  type SavedInvestmentPlan,
} from "@project/services";
import { InvestmentSchema } from "@project/schemas";
import { useDocumentTitle } from "@project/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@project/components/ui/dialog";

export const InvestPage = () => {
  const pageTitle = "Investment Calculator";
  useDocumentTitle(pageTitle);
  const [result, setResult] = useState<InvestmentPlanResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"calculator" | "saved">(
    "calculator"
  );

  const [planName, setPlanName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm({
    id: "investment-form",
    defaultValues: {
      amount: 1000,
      durationMonths: 12,
      monthlyContribution: 0,
      riskTolerance: "medium" as const,
    },
    validators: {
      onChange: InvestmentSchema,
    },
    onSubmit: async ({ value }) => {
      calculateMutation.mutate(value);
    },
  });

  const calculateMutation = useMutation({
    mutationFn: investmentService.calculateInvestmentPlan,
    onSuccess: (data) => {
      setResult(data?.plan);
    },
  });

  const savePlanMutation = useMutation({
    mutationFn: investmentService.saveInvestmentPlan,
    onSuccess: () => {
      plansQuery.refetch();
      setActiveTab("saved");
    },
  });

  const plansQuery = useQuery({
    queryKey: ["investmentPlans"],
    queryFn: () => investmentService.getUserPlans(),
  });

  const handleSavePlan = (planName: string) => {
    if (!result) return;

    const planToSave: SavedInvestmentPlan = {
      planName,
      description: result.description,
      items: result.items.map((item) => ({
        investment_id: item.investment_id ?? 0,
        bank_account_id: item.bank_account_id ?? 0,
        amount: item.amount ?? 0,
        expected_duration_months: item.expected_duration_months ?? 0,
      })),
    };

    savePlanMutation.mutate(planToSave);
  };

  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (planName.trim()) {
      handleSavePlan(planName);
    }
  };

  return (
    <PageLayout>
      <Heading heading={pageTitle} />

      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === "calculator" ? "default" : "outline"}
          onClick={() => setActiveTab("calculator")}
        >
          Calculator
        </Button>
        <Button
          variant={activeTab === "saved" ? "default" : "outline"}
          onClick={() => setActiveTab("saved")}
        >
          My Saved Plans
        </Button>
      </div>

      {activeTab === "calculator" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Investment Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void form.handleSubmit();
                }}
                className="space-y-4"
              >
                <div>
                  <form.Field
                    name="amount"
                    >{(field) => (
                      <div className="space-y-2">
                        <InputField type="number" field={field} label=" Investment Amount (R)"/>
                      </div>
                    )}
                  </form.Field>
                </div>

                <div>
                  <form.Field
                    name="durationMonths"
                    >{(field) => (
                      <div className="space-y-2">
                        
                        <Label htmlFor={field.name}>Investment Duration</Label>
                        <div className="flex gap-2 items-center">
                        <InputField
                          type="number"
                          field={field}
                          label='Duration'
                        />
                        <SelectGroup className="w-full">
                        <SelectLabel> Unit</SelectLabel>
                          <Select
                            onValueChange={(value) => {
                              const multiplier = value === "years" ? 12 : 1;
                              field.handleChange(
                                Math.floor(field.state.value / multiplier) *
                                  multiplier
                              );
                            }}
                            defaultValue="months"
                          >
                            <SelectTrigger className="placeholder:text-gray-300 w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black">
                              <SelectValue placeholder="Months" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="months">Months</SelectItem>
                              <SelectItem value="years">Years</SelectItem>
                            </SelectContent>
                          </Select>
                          </SelectGroup>
                        </div>
                      </div>
                    )}
                 </form.Field>
                </div>

                <div>
                  <form.Field
                    name="monthlyContribution"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>
                          Monthly Contribution (R) - Optional
                        </Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          type="number"
                          onChange={(e) =>
                            field.handleChange(Number.parseFloat(e.target.value) || 0)
                          }
                        />
                        {field.state.meta.errors ? (
                          <p className="text-sm text-red-500">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        ) : null}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <form.Field
                    name="riskTolerance"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label>Risk Tolerance</Label>
                        <RadioGroup
                          value={field.state.value}
                          onValueChange={(value) =>
                            field.handleChange(
                              value as "low" | "medium" | "high"
                            )
                          }
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="risk-low" />
                            <Label htmlFor="risk-low">Low</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="risk-medium" />
                            <Label htmlFor="risk-medium">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="risk-high" />
                            <Label htmlFor="risk-high">High</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  />
                </div>

                <Button type="submit" disabled={calculateMutation.isPending}>
                  {calculateMutation.isPending
                    ? "Calculating..."
                    : "Calculate Plan"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Recommended Investment Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{result.planName}</h3>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Invested</p>
                    <p className="text-xl font-bold">
                      R{result?.totalInvested?.toLocaleString()}
                    </p>
                  </div>
                  {/* <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Projected Value</p>
                    <p className="text-xl font-bold">
                      R
                      {result?.projectedValue?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div> */}
                  {/* <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Projected Growth</p>
                    <p className="text-xl font-bold">
                      R
                      {result.projectedGrowth?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div> */}
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-xl font-bold">
                      {result.durationMonths} months
                    </p>
                  </div>
                </div>

                <h4 className="font-medium mb-2">Investment Banks / Institutions</h4>
                <div className="space-y-4">
                  {result.items.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-600">
                            {item.type} • {item.risk_level} risk
                          </p>
                        </div>
                        <span className="font-bold">
                          R{item.amount?.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{
                              width: `${(item?.amount / result?.totalInvested) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-sm mt-1">
                        Expected return: {item?.expected_return}% •
                        Duration: {item.expected_duration_months} months
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button disabled={savePlanMutation.isPending}>
                        {savePlanMutation.isPending
                          ? "Saving..."
                          : "Save This Plan"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <form onSubmit={handleDialogSubmit}>
                        <DialogHeader>
                          <DialogTitle>Save Investment Plan</DialogTitle>
                          <DialogDescription>
                            Give your plan a name to save it for future
                            reference.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="planName" className="text-right">
                              Plan Name
                            </Label>
                            <Input
                              id="planName"
                              value={planName}
                              onChange={(e) => setPlanName(e.target.value)}
                              placeholder="e.g., Retirement Plan 2030"
                              className="col-span-3"
                              autoFocus
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            disabled={
                              !planName.trim() || savePlanMutation.isPending
                            }
                          >
                            {savePlanMutation.isPending
                              ? "Saving..."
                              : "Save Plan"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div>
          {plansQuery.isLoading ? (
            <p>Loading your plans...</p>
          ) : plansQuery.data?.plans?.length === 0 ? (
            <p>You don't have any saved plans yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plansQuery.data?.plans.map((plan) => (
                <Card key={plan.plan_id}>
                  <CardHeader>
                    <CardTitle>{plan.plan_name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      Created on{" "}
                      {new Date(plan.created_at)?.toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Total Invested</p>
                      <p className="text-xl font-bold">
                        R{plan.totalInvested}
                      </p>
                    </div>

                    <h4 className="font-medium mb-2">Investments</h4>
                    <div className="space-y-2">
                      {plan.items.map((item) => (
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
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};
