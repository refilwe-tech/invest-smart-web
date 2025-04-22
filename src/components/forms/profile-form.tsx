import toast from "react-hot-toast";
import { Button, InputField } from "../common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { User, userService } from "@project/services";
import { useForm } from "@tanstack/react-form";
import { FC } from "react";
import { ProfileSchema } from "@project/schemas";

export type ProfileFormProps = {
  initialValues: User;
  isEdit: boolean;
};

export const ProfileForm: FC<ProfileFormProps> = ({
  initialValues,
  isEdit,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/profile" });
  const refresh = () => navigate({ to: "/profile" });
  const { mutateAsync } = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("User profile updated successfully");
      refresh();
    },
    onError: () => toast.error("Failed to update profile details"),
  });
  const onSubmit = async (data: User) => mutateAsync(data);

  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onChange: ProfileSchema,
    },
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
          name="firstName"
          children={(field) => (
            <InputField disabled={!isEdit} field={field} label="First Name" maxLength={30} />
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <InputField
              field={field}
              label="Email"
              disabled
              type="email"
            />
          )}
        />
        <form.Field
          name="age"
          children={(field) => (
            <InputField
              field={field}
              label="Age"
              disabled
              type="number"
            />
          )}
        />
      </section>
      <section className="flex flex-col w-full gap-3">
        <form.Field
          name="lastName"
          children={(field) => (
            <InputField disabled={!isEdit} field={field} label="Last Name" maxLength={30}/>
          )}
        />

        <form.Field
          name="phoneNumber"
          children={(field) => (
            <InputField
              disabled={!isEdit}
              field={field}
              label="Phone Number"
              type="tel"
              maxLength={10}
            />
          )}
        />
      </section>
      {isEdit && (
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
                {isSubmitting ? "..." : "Update Details"}
              </Button>
            </section>
          )}
        />
      )}
    </form>
  );
};
