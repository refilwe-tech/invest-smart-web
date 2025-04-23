import { useMemo } from "react";
import toast from "react-hot-toast";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, InputField } from "../common";
import { financialService, type UserFinances } from "@project/services";
import { PageLayout } from "../layouts";
import { FinancesSchema } from "@project/schemas";

export type FinancesFormProps = {
  initialValues: UserFinances;
  isEdit?: boolean;
};

export const FinancesForm = ({
  isEdit = false,
  initialValues,
}: FinancesFormProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const refresh = () => navigate({ to: "/finances" });
  const isNewProfile = useMemo(
    () => !initialValues?.profileId,
    [initialValues]
  );
  const { mutateAsync } = useMutation({
    mutationFn: isNewProfile
      ? financialService.createFinancialProfile
      : financialService.updateFinancialProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financialProfile"] });
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
    validators: {
      onChange: FinancesSchema
    },
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <PageLayout>
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
        name="grossSalary">
        {  (field) => (
          <InputField field={field} label="Gross Salary" type="number" />
        )}
        </form.Field>

      <form.Field
        name="monthlyExpenses"
       >{(field) => (
          <InputField
            field={field}
            label="Total Monthly Expenses"
            type="number"
          />
        )}
      </form.Field>
      <form.Field
        name="netSalary"
       >{(field) => (
          <InputField field={field} label="Net Salary" type="number" />
        )}
      </form.Field>
      <form.Field
        name="currentSavings"
      >{(field) => (
          <InputField field={field} label="Current Savings" type="number" />
        )}
      </form.Field>
      <form.Field
        name="investmentGoal"
        >{(field) => (
          <InputField field={field} label="Investment Goal" type="text" />
        )}
        </form.Field>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-400 mb-1">
          Estimated Tax Rate
        </p>
        <div className="h-10 flex items-center px-3 text-lg font-medium">
          {Number(form.getFieldValue("grossSalary")) > 0 &&
          Number(form.getFieldValue("netSalary")) > 0
            ? `${(100 - (Number(form.getFieldValue("netSalary")) / Number(form.getFieldValue("grossSalary"))) * 100).toFixed(2)}%`
            : "N/A"}
        </div>
      </div>

      <form.Subscribe
        selector={({canSubmit, isSubmitting}) => [canSubmit, isSubmitting]}
       >{([canSubmit, isSubmitting]) => (
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
      </form.Subscribe>
    </form>
    </PageLayout>
  );
};
