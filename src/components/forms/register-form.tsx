import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import { Button, InputField } from "../common";
import { authService, type NewUser } from "../../services";
import { RegisterSchema } from "@project/schemas";

export const RegisterForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/register" });
  const goToLogin = () => navigate({ to: "/login" });
  const { mutateAsync } = useMutation(
    {
      mutationFn: authService.register,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("User registered successfully");
        goToLogin();
      },
      onError: ({ response }: AxiosError) => {
        toast.error(response?.data?.error);
      },
    },
    queryClient
  );
  const onSubmit = (data: NewUser) => mutateAsync(data);

  const form = useForm({
    defaultValues: {
      firstName: "",
      idNumber: "",
      confirmPassword: "",
      lastName: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: RegisterSchema,
    },
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <form
      className="flex flex-col gap-4"
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
      <div>
        <form.Field name="firstName">
          {(field) => (
            <InputField maxLength={30} field={field} label="First Name" />
          )}
        </form.Field>
      </div>
      <div>
        {/* A type-safe field component*/}
        <form.Field name="lastName">
          {(field) => (
            <InputField maxLength={30} field={field} label="Last Name" />
          )}
        </form.Field>
      </div>
      <div>
        <form.Field name="idNumber">
          {(field) => (
            <InputField maxLength={13} field={field} label="ID Number" />
          )}
        </form.Field>
      </div>
      <div>
        <form.Field name="email">
          {(field) => <InputField field={field} label="Email" type="email" />}
        </form.Field>
      </div>
      <div>
        <form.Field name="password">
          {(field) => (
            <InputField
              maxLength={16}
              field={field}
              label="Password"
              type="password"
            />
          )}
        </form.Field>
      </div>
      <div>
        <form.Field name="confirmPassword">
          {(field) => (
            <InputField
              maxLength={16}
              field={field}
              label="Confirm Password"
              type="password"
            />
          )}
        </form.Field>
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <section
            id="submit"
            className="flex items-center w-full flex-col gap-2"
          >
            <Button variant="gradient" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          </section>
        )}
      </form.Subscribe>
    </form>
  );
};
