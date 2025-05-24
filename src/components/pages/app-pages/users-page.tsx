import { createColumnHelper } from "@tanstack/react-table";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { Container, PageLayout } from "../../layouts";
import { type UserApi, userService } from "../../../services";
import { Button, DeleteButton, Heading, Table } from "../../common";
import { useUserStore } from "@project/store/user-store";
import { useDocumentTitle } from "@project/hooks";

export const UsersPage = () => {
  const pageTitle = "Clients";
  useDocumentTitle(pageTitle);
  const { user: currentUser } = useUserStore();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
  });
  const navigate = useNavigate({ from: "/users" });
  const goToNewUser = () => navigate({ to: "/users/new" });

  const columnHelper = createColumnHelper<UserApi>();
  const columns = [
    columnHelper.accessor("user_id", {
      header: "Client ID",
    }),
    columnHelper.accessor("first_name", {
      header: "First Name",
    }),
    columnHelper.accessor("last_name", {
      header: "Last Name",
    }),
    columnHelper.accessor("gender", {
      header: "Gender",
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
          currentUser?.id !== row?.original.user_id && (
            <DeleteButton id={user_id ?? ""} userRole={user_role} />
          )
        );
      },
    }),
  ];

  return (
    <PageLayout isLoading={isLoading}>
      <Outlet />
      <section className="flex flex-col gap-4">
        <Heading heading={pageTitle} />
        <section className="flex justify-end items-center">
          <Button variant="gradient" onClick={goToNewUser}>
            Add Client
          </Button>
        </section>
        <Container>
          <Table
            data={data?.users ?? []}
            columns={columns}
            loading={isLoading}
          />
        </Container>
      </section>
    </PageLayout>
  );
};
