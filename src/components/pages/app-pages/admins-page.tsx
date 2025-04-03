import { Container } from "../../layouts";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services";
import { Heading, Table } from "../../common";
import { createColumnHelper } from "@tanstack/react-table";

export type userApiType = {
  user_id:string;
  first_name:string;
  last_name:string
  phone_number:string;
  email:string
}
export const AdminUsersPage = () => {

 const { data, isLoading } = useQuery({
     queryKey: ["admins"],
     queryFn: userService.getAdminUsers,
   });

   const columnHelper = createColumnHelper<userApiType>();
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
