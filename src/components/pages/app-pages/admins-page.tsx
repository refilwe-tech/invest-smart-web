import { Container, PageLayout } from "../../layouts";
import { useQuery } from "@tanstack/react-query";
import { UserApi, userService } from "../../../services";
import { DeleteButton, Heading, Table } from "../../common";
import { createColumnHelper } from "@tanstack/react-table";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { LiaUserEditSolid } from "react-icons/lia";
import { USER_ROLES, useUserStore } from "@project/store/user-store";

export const AdminUsersPage = () => {
  const { user: currentUser } = useUserStore();
  const { data, isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: () => userService.getAdminUsers(),
  });
  const navigate = useNavigate({ from: "/admins" });
  const goToNewUser = () => navigate({ to: "/admins/new" });

  const EditBtn = ({ onClick }: { onClick: () => void }) => (
    <button
      className={`text-tertiary hover:text-blue-700 p-2 font-medium flex gap-2`}
      onClick={onClick}
    >
      <LiaUserEditSolid className="w-5 h-5" />
    </button>
  );

  const openProfile = (id: string) => navigate({ to: `/admins/${id}/edit` });

  const columnHelper = createColumnHelper<UserApi>();
  const columns = [
    columnHelper.accessor("user_id", {
      header: "ID",
    }),
    columnHelper.accessor("first_name", {
      header: "First Name",
    }),
    columnHelper.accessor("last_name", {
      header: "Last Name",
    }),
    columnHelper.accessor("phone_number", {
      header: "Phone Number",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.display({
      id: "Actions",
      cell: ({ row }) => {
        const { user_id, user_role } = row.original;
        return (
          currentUser?.userRole === USER_ROLES.SUPER_ADMIN &&
          currentUser?.id !== row?.original.user_id && (
            <div className={`flex items-center gap-2`}>
              <EditBtn onClick={() => openProfile(user_id)} /> |
              <DeleteButton id={user_id} userRole={user_role} />
            </div>
          )
        );
      },
    }),
  ];

  return (
    <PageLayout isLoading={isLoading}>
      <Outlet />
      <section className="flex flex-col gap-4">
        <Heading heading="Admins" />
        {currentUser?.userRole === USER_ROLES.SUPER_ADMIN && (
          <section className="flex justify-end items-center">
            <button
              onClick={goToNewUser}
              className="hover:text-[#1E3A8A] flex bg-[#1E3A8A] hover:bg-[#0D9488] text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
            >
              Add Admin
            </button>
          </section>
        )}
        <Container>
          <Table
            data={data?.admins ?? []}
            columns={columns}
            loading={isLoading}
          />
        </Container>
      </section>
    </PageLayout>
  );
};
