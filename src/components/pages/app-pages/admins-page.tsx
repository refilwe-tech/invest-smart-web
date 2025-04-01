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
      {/*       {isOpen && (
        <div className="fixed top-0 right-0 w-1/3 h-full rounded-lg shadow-lg bg-white z-50">
          <section className="flex justify-end p-4">
            <button onClick={closeModal}>
              <IoCloseOutline className="w-8 h-8 hover:text-blue-500" />
            </button>
          </section>
          <div className="bg-white p-4 rounded-lg">
            <section className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">{title}</h2>
              <p className="text-center">
                A user who can access the system. They can be a student, staff
                or admin.
              </p>
            </section>

            <UserForm
              role="Certifyee"
              isEdit={editing}
              user={editing ? currUser : userInitialValues}
            />
          </div>
        </div>
      )} */}
    </section>
  );
};
