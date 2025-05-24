import { useMutation, useQuery } from "@tanstack/react-query";
import { userModel, userService } from "../../../services";
import {
  Button,
  EditButton,
  PageLayout,
  ProfileForm,
} from "@project/components";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@project/store";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { USER_ROLES } from "@project/store/user-store";
import { FaUserClock } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useDocumentTitle } from "@project/hooks";

export const ProfilePage = () => {
  const pageTitle = "Profile";
  useDocumentTitle(pageTitle);
  const { setIsAuthenticated, setToken } = useAuthStore();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
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
      toast.error(response?.config.data ?? "Check server connection.");
    },
  });

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onDelete = () => mutate();

  const isAdmin = [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN].includes(
    data?.userRole ?? ""
  );

  return (
    <PageLayout isLoading={isLoading}>
      {isDelete && (
        <div className="fixed top-[20%] right-[25%] w-1/3 h-46 rounded-lg shadow-lg bg-white z-50">
          <section className="flex justify-end p-4">
            <button
              title="Close"
              type="button"
              onClick={() => setIsDelete(false)}
            >
              <IoMdCloseCircleOutline className="w-8 h-8 hover:text-blue-500" />
            </button>
          </section>
          <div className="bg-white p-4 rounded-lg">
            <section className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">
                Confirm Delete Account Action
              </h2>
              <p className="text-center text-xs">
                Are you sure you want to delete your account? Once deleted you
                will not be able to access the platform.
              </p>
              <section className="gap-4 grid grid-cols-2 py-2 w-full justify-center items-center">
                <Button onClick={onDelete} variant="negative">
                  Yes
                </Button>
                <Button onClick={() => setIsDelete(false)} variant="gradient">
                  No
                </Button>
              </section>
            </section>
          </div>
        </div>
      )}
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
          <h3 className="text-xl font-semibold">{`${data?.firstName} ${data?.lastName} ${data?.gender ? (data?.gender ?? "") : ""}`}</h3>
          {isAdmin && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <MdOutlineAdminPanelSettings />
              Administrator
            </span>
          )}
          <section className="flex items-center gap-2">
            <FaUserClock />
            <p className="text-xs text-green-400">
              Joined {dayjs(data?.createdAt).format("DD MMMM YYYY")}
            </p>
            |
            <p className="text-xs text-teal-400">
              Updated {dayjs(data?.updatedAt).format("DD MMMM YYYY")}
            </p>
          </section>
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
              age: 0,
              updatedAt: "",
            }
          }
        />
        {data?.userRole !== USER_ROLES.SUPER_ADMIN && (
          <section className="grid place-items-center p-4 absolute bottom-0 right-0 ">
            <button
              type="button"
              onClick={() => setIsDelete(true)}
              className="text-sm p-3 bg-red-500 rounded-3xl text-white hover:bg-red-900"
            >
              Delete Account
            </button>
          </section>
        )}
      </section>
    </PageLayout>
  );
};
