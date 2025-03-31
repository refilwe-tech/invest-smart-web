import { Container } from "../../layouts";
import { useQuery } from "@tanstack/react-query";
import { investmentService } from "../../../services";
import { Heading, Table } from "../../common";
import { createColumnHelper } from "@tanstack/react-table";

export const InvestmentsPage = () => {

 const { data, isLoading } = useQuery({
     queryKey: ["investments"],
     queryFn: investmentService.getInvestments,
   });

   const columnHelper = createColumnHelper();
   const columns = [
    columnHelper.accessor("investment_name", {
      header: "Name",
    }),
    columnHelper.accessor("minimum_interest", {
      header: "Min Interest %",
    }),
    columnHelper.accessor("maximum_interest", {
      header: "Max Interest %",
    }),
   ];

  return (
    <section className="flex flex-col gap-4">
        <Heading heading="Investment Options" />
      <section className="flex justify-end items-center">
        <button
          onClick={()=>void 0}
          className="hover:text-[#1E3A8A] flex bg-[#1E3A8A] hover:bg-[#0D9488] text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
        >
          Add Bank
        </button>
      </section>
      <Container>
        <Table data={data?.investments ?? []} columns={columns} loading={isLoading} />
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
