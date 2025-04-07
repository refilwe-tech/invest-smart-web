import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";

import { Button, InputField } from "../common";
import { authService, NewUser } from "../../services";
import { AxiosError } from "axios";

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
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
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
        <form.Field
          name="firstName"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A first name is required"
                : value.length < 3
                  ? "First name must be at least 3 characters"
                  : undefined,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") && 'No "error" allowed in first name'
              );
            },
          }}
          children={(field) => <InputField field={field} label="First Name" />}
        />
      </div>
      <div>
        {/* A type-safe field component*/}
        <form.Field
          name="lastName"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A last name is required"
                : value.length < 3
                  ? "Last name must be at least 3 characters"
                  : undefined,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") && 'No "error" allowed in last name'
              );
            },
          }}
          children={(field) => <InputField field={field} label="Last Name" />}
        />
      </div>
      <div>
        {/* A type-safe field component*/}
        <form.Field
          name="email"
          children={(field) => (
            <InputField field={field} label="Email" type="email" />
          )}
        />
      </div>
      <div>
        <form.Field
          name="password"
          children={(field) => (
            <InputField field={field} label="Password" type="password" />
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <section
            id="submit"
            className="flex items-center w-full flex-col gap-2"
          >
            <Button variant="solid" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          </section>
        )}
      />
    </form>
  );
};
