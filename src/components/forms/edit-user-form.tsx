import { useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";

import { Button, InputField } from "../common";
import { type User, userModel, userService } from "../../services";
import type { AxiosError } from "axios";
import { ClipLoader } from "react-spinners";
import { userSchema } from "@project/schemas";

export const EditUserForm = ({ userRole = "user" }: { userRole?: string }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const goBack = () => navigate({ to: `/${userRole}s` });
  const { mutateAsync } = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      toast.success("User updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      goBack();
    },
    onError: ({ response }: AxiosError) => {
      toast.error("Error updating user.");
      toast.error((response?.data as { error: string })?.error);
    },
  });
  const { userId } = useParams({ strict: false });

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getUserById(userId ?? ""),
    enabled: !!userId,
    select: userModel,
  });

  const onSubmit = (data: User) => mutateAsync(data);

  const form = useForm({
    defaultValues: {
      id: userData?.id ?? "",
      isActive: userData?.isActive ?? true,
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      idNumber: userData?.idNumber ?? "",
      email: userData?.email ?? "",
      password: "",
      confirmPassword: "",
      userRole: userData?.userRole ?? userRole,
    },
    validators: {
      onChange: userSchema,
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
      {isLoading && (
        <section className="flex justify-center gap-2">
          <ClipLoader className=" text-primary" /> Loading...
        </section>
      )}
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
        >
          {(field) => <InputField field={field} label="First Name" />}
        </form.Field>
      </div>
      <div>
        <form.Field
          name="lastName"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A Last name is required"
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
        >
          {(field) => <InputField field={field} label="Last Name" />}
        </form.Field>
      </div>
      <div>
        <form.Field name="idNumber">
          {(field) => (
            <InputField
              field={field}
              label="ID Number (Optional)"
              type="text"
            />
          )}
        </form.Field>
      </div>
      <div>
        {/* A type-safe field component*/}
        <form.Field name="email">
          {(field) => (
            <InputField field={field} label="Email (Optional)" type="email" />
          )}
        </form.Field>
      </div>
      <div>
        <form.Field name="password">
          {(field) => (
            <InputField
              field={field}
              label="Password (Optional)"
              type="password"
            />
          )}
        </form.Field>
      </div>
      <div>
        <form.Field name="confirmPassword">
          {(field) => (
            <InputField
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
