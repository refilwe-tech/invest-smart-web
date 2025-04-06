import { Container } from "../../layouts";
import { useQuery } from "@tanstack/react-query";
import { UserApi, userService } from "../../../services";
import { DeleteButton, EditButton, Heading, Table } from "../../common";
import { createColumnHelper } from "@tanstack/react-table";

export const AdminUsersPage = () => {

 const { data, isLoading } = useQuery({
     queryKey: ["admins"],
     queryFn: userService.getAdminUsers,
   });

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
          <div
            className={`flex items-center gap-2`}
          >
           {/*  <EditButton
              onEdit={() => onEdit(row.original)}
              id={user_id} userRole={user_role}
            />{" "}
            | */}
            <DeleteButton id={user_id} userRole={user_role} />
          </div>
        );
      },
    }),
   ];

  return (
    <section className="flex flex-col gap-4">
        <Heading heading="Admins" />
      <section className="flex justify-end items-center">
        <button
          onClick={()=>void 0}
          className="hover:text-[#1E3A8A] flex bg-[#1E3A8A] hover:bg-[#0D9488] text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
        >
          Add Admin
        </button>
      </section>
      <Container>
        <Table data={data?.users ?? []} columns={columns} loading={isLoading} />
      </Container>
      
    </section>
  );
};
