import { useQuery } from "@tanstack/react-query";
import { userModel, userService } from "../../../services";
import { EditButton, ProfileForm } from "@project/components";
import dayjs from "dayjs";
import { useState } from "react";

export const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userService.getCurrentUser(),
    enabled: !!localStorage.getItem("token"),
    select: userModel,
  });

  const toggleEdit = () => setIsEdit(!isEdit);

  return (
    <section className="grid gap-3">
      <section className="grid place-items-center gap-1">
        <img
          src={`https://eu.ui-avatars.com/api/?name=${data?.firstName}+${data?.lastName}&background=1E2D40&color=fff`}
          alt="profile"
          className="w-48 h-48 rounded-full"
        />
        <EditButton onClick={toggleEdit} isEdit={isEdit} />
        <h3 className="text-xl font-semibold">{`${data?.firstName} ${data?.lastName}`}</h3>
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
        <button className="text-sm p-3 bg-red-500 rounded-3xl text-white hover:bg-red-900">
          Delete Account
        </button>
      </section>
    </section>
  );
};
