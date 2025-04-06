import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useForm } from "@tanstack/react-form";

import { Button, InputField } from "../common";
import { authService, LoginUser } from "../../services";
import { useAuthStore } from "../../store";

export const LoginForm = () => {
  const queryClient = useQueryClient();
  const { setToken, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate({ from: "/login" });
  const goToHome = () => navigate({ to: "/home" });

  const { mutateAsync } = useMutation(
    {
      mutationFn: authService.login,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        const { token } = data;
        setToken(token);
        localStorage.setItem('token',token)
        setIsAuthenticated(!!token);     
        goToHome();
      },
    },
    queryClient
  );
  const onSubmit = async (data: LoginUser) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      toast.error(error as string);
    }
  };
  const form = useForm({
    defaultValues: {
      email: "refilwe.dev@gmail.com",
      password: "P@ssword1",
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
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
            className="grid place-items-center  w-full flex-col gap-2"
          >
            <Button variant="solid" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Login"}
            </Button>
          </section>
        )}
      />
    </form>
  );
};
