import { useQuery } from "@tanstack/react-query";
import { userModel, userService } from "../../../services";

export const ProfilePage = () => {
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userService.getCurrentUser(),
    enabled: !!localStorage.getItem("token"),
    select:userModel
  });

  return (
    <section className="grid gap-3">
      <section className="grid place-items-center gap-1">
        <img
          src={`https://eu.ui-avatars.com/api/?name=${data?.firstName}+${data?.lastName}&background=1E2D40&color=fff`}
          alt="profile"
          className="w-48 h-48 rounded-full"
        />
        <h3 className="text-xl font-semibold">{`${data?.firstName} ${data?.lastName}`}</h3>
      </section>
    </section>
  );
};
