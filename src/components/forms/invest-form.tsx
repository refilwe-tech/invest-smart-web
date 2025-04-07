import toast from "react-hot-toast";
import { Button, InputField } from "../common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { userService } from "@project/services";
import { useForm } from "@tanstack/react-form";


// Define the investment data structure
export interface InvestmentData {
  id?: string;
  userId: string;
  gross_salary: number;
  net_salary: number;
  age: number;
}

export type InvestmentFormProps = {
  initialValues: InvestmentData;
  isEdit: boolean;
};

export const InvestForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const refresh = () => navigate({ to: "/investments" });
  const isEdit = false;

  const initialValues = {
    grossSalary:0,
    age:0,
    netSalary:0,
    userId:''
  }
  
  /* isEdit 
      ? userService.updateInvestment 
      : userService.createInvestment, */
  const { mutateAsync } = useMutation({
    mutationFn: 
      userService.updateInvestment 
     ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      toast.success(isEdit ? "Financial profile updated successfully" : "Investment profile created successfully");
      refresh();
    },
    onError: () => toast.error(isEdit ? "Failed to update investment details" : "Failed to create investment profile"),
  });
  
  const onSubmit = async (data: InvestmentData) => mutateAsync(data);

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      className="grid grid-cols-2 gap-4 w-full px-20 py-10"
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
      <section className="flex flex-col gap-3">
        <form.Field
          name="gross_salary"
          validators={{
            onChange: ({ value }) =>
              value === undefined || value === null
                ? "Gross salary is required"
                : value < 0
                  ? "Gross salary cannot be negative"
                  : undefined,
          }}
          children={(field) => (
            <InputField 
              field={field} 
              label="Gross Salary" 
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter your gross salary"
            />
          )}
        />
        
        <form.Field
          name="age"
          validators={{
            onChange: ({ value }) =>
              value === undefined || value === null
                ? "Age is required"
                : value < 18
                  ? "You must be at least 18 years old"
                  : value > 120
                    ? "Please enter a valid age"
                    : undefined,
          }}
          children={(field) => (
            <InputField
              field={field}
              label="Age"
              type="number"
              min="18"
              max="120"
              placeholder="Enter your age"
            />
          )}
        />
      </section>
      
      <section className="flex flex-col w-full gap-3">
        <form.Field
          name="net_salary"
          validators={{
            onChange: ({ value }) =>
              value === undefined || value === null
                ? "Net salary is required"
                : value < 0
                  ? "Net salary cannot be negative"
                  : value > field.state.value.gross_salary
                    ? "Net salary cannot be greater than gross salary"
                    : undefined,
          }}
          children={(field) => (
            <InputField
              field={field}
              label="Net Salary"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter your net salary"
            />
          )}
        />
        
        {/* This space is kept empty to maintain grid alignment */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-1">
            Estimated Tax Rate
          </label>
          <div className="h-10 flex items-center px-3 text-lg font-medium">
            {form.getFieldValue("gross_salary") > 0 && form.getFieldValue("net_salary") > 0 ? (
              `${(100 - (form.getFieldValue("net_salary") / form.getFieldValue("gross_salary") * 100)).toFixed(2)}%`
            ) : (
              "N/A"
            )}
          </div>
        </div>
      </section>
      
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
              {isSubmitting ? "..." : "Create Investment Profile"}
            </Button>
          </section>
        )}
      />
    </form>
  );
};