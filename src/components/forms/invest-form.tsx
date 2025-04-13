import { useMemo } from "react";
import toast from "react-hot-toast";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, InputField } from "../common";
import { UserFinances, userService } from "@project/services";

// Define the investment data structure
export type InvestmentFormProps = {
  initialValues: UserFinances;
  isEdit?: boolean;
};

export const InvestForm = ({
  isEdit = false,
  initialValues,
}: InvestmentFormProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const refresh = () => navigate({ to: "/finances" });
  const isNewProfile = useMemo(
    () => !initialValues?.profileId,
    [initialValues]
  );

  const { mutateAsync } = useMutation({
    mutationFn: !isNewProfile
      ? userService.updateInvestment
      : userService.createInvestment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      toast.success(
        !isNewProfile
          ? "Financial profile updated successfully"
          : "Investment profile created successfully"
      );
      refresh();
    },
    onError: () => toast.error("Failed to update investment details"),
  });

  const onSubmit = async (data: UserFinances) => mutateAsync(data);

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      className="flex flex-col gap-3 w-full px-3"
      onReset={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.reset();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit(onSubmit);
      }}
    >
        <form.Field
          name="grossSalary"
          validators={{
            onChange: ({ value }) =>
              value === undefined || value === null
                ? "Gross salary is required"
                : Number(value) < 0
                  ? "Gross salary cannot be negative"
                  : undefined,
          }}
          children={(field) => (
            <InputField field={field} label="Gross Salary" type="number" />
          )}
        />

        <form.Field
          name="monthlyExpenses"
          validators={{
            onChange: ({ value }) =>
              value === undefined || value === null
                ? "Monthly Expenses are required"
                : undefined,
          }}
          children={(field) => (
            <InputField
              field={field}
              label="Total Monthly Expenses"
              type="number"
            />
          )}
        />
        <form.Field
          name="netSalary"
          children={(field) => (
            <InputField field={field} label="Net Salary" type="number" />
          )}
        />
        <form.Field
          name="investmentGoal"
          children={(field) => (
            <InputField field={field} label="Investment Goal" type="text" />
          )}
        />
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-1">
            Estimated Tax Rate
          </label>
          <div className="h-10 flex items-center px-3 text-lg font-medium">
            {form.getFieldValue("grossSalary") > 0 &&
            form.getFieldValue("netSalary") > 0
              ? `${(100 - (form.getFieldValue("netSalary") / form.getFieldValue("grossSalary")) * 100).toFixed(2)}%`
              : "N/A"}
          </div>
        </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <section
            id="submit"
            className="flex items-center w-full col-span-2 flex-col gap-2"
          >
            <Button
              className="w-96"
              variant="solid"
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting
                ? "..."
                : isEdit
                  ? "Update Investment Profile"
                  : "Create Investment Profile"}
            </Button>
          </section>
        )}
      />
    </form>
  );
};
