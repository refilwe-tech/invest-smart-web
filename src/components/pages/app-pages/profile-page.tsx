import { useMutation, useQuery } from "@tanstack/react-query";
import { userModel, userService } from "../../../services";
import { EditButton, ProfileForm } from "@project/components";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@project/store";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const ProfilePage = () => {
  const { setIsAuthenticated, setToken } = useAuthStore();
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userService.getCurrentUser(),
    enabled: !!localStorage.getItem("token"),
    select: userModel,
  });

  const { mutate } = useMutation({
    mutationFn: () => userService.deleteUser(data?.id ?? ""),
    onSuccess: () => {
      setIsAuthenticated(false);
      setToken(null);
      localStorage.clear();
      toast.success("Account deleted successfully. Sad to see you leave.", {
        duration: 5000,
      });
      navigate({ to: "/login" });
    },
    onError: ({ response }: AxiosError) => {
      toast.error(response?.data?.error);
    },
  });

  const toggleEdit = () => setIsEdit(!isEdit);

  const onDelete = () => mutate();

  // Admin badge display logic
  const isAdmin = data?.userRole === "admin";

  return (
    <section className="grid gap-3">
      <section className="grid place-items-center gap-1 relative">
        <img
          src={`https://eu.ui-avatars.com/api/?name=${data?.firstName}+${data?.lastName}&background=1E2D40&color=fff`}
          alt="profile"
          className="w-48 h-48 rounded-full"
        />
        {isAdmin && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            Admin
          </div>
        )}
        <EditButton onClick={toggleEdit} isEdit={isEdit} />
        <h3 className="text-xl font-semibold">{`${data?.firstName} ${data?.lastName}`}</h3>
        {isAdmin && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Administrator
          </span>
        )}
        <p className="text-xs text-green-400">
          Joined {dayjs(data?.createdAt).format("DD MMMM YYYY")}
        </p>
        <p className="text-xs text-teal-400">
          Last Updated {dayjs(data?.updatedAt).format("DD MMMM YYYY")}
        </p>
      </section>
      <ProfileForm
        isEdit={isEdit}
        initialValues={
          data ?? {
            id: "",
            userRole: "user",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            createdAt: "",
            isActive: true,
            updatedAt: "",
          }
        }
      />
      <section className="grid place-items-center p-4 absolute bottom-0 right-0 ">
        <button
          onClick={onDelete}
          className="text-sm p-3 bg-red-500 rounded-3xl text-white hover:bg-red-900"
        >
          Delete Account
        </button>
      </section>
    </section>
  );
};
