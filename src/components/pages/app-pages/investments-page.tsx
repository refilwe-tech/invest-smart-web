import { Container, PageLayout } from "../../layouts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { investmentService } from "../../../services";
import { Heading, Table } from "../../common";
import { createColumnHelper } from "@tanstack/react-table";
import { GoTrash } from "react-icons/go";
import toast from "react-hot-toast";

export const InvestmentsPage = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => investmentService.deleteInvestment(id),
    onSuccess: () => {
      toast.success("Investment deleted successfully.", { duration: 3000 });
      queryClient.invalidateQueries({
        queryKey: ["investments"],
      });
    },
    onError: () => {
      //toast.error(error);
      toast.error("Failed to delete investment. Please try again.");
    },
  });
  const onDelete = (id: string) => mutate(id);
  const { data, isLoading } = useQuery({
    queryKey: ["investments"],
    queryFn: investmentService.getInvestments,
  });

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("investment_name", {
      header: "Name",
    }),
    columnHelper.accessor("expected_return_min", {
      header: "Min Interest %",
    }),
    columnHelper.accessor("expected_return_max", {
      header: "Max Interest %",
    }),
    columnHelper.display({
      id: "Actions",
      cell: ({ row }) => {
        const { investment_id } = row.original;

        return (
          <div className={`flex items-center gap-2`}>
            {/*  <EditButton
                      onEdit={() => onEdit(row.original)}
                      id={user_id} userRole={user_role}
                    />{" "}
                    | */}
            <button className="p-2" onClick={() => onDelete(investment_id)}>
              <GoTrash className="hover:text-red-500" />
            </button>
          </div>
        );
      },
    }),
  ];

  return (
    <PageLayout isLoading={isLoading}>
      <section className="flex flex-col gap-4">
        <Heading heading="Investment Options" />
        {false && (
          <section className="flex justify-end items-center">
            <button
              onClick={() => void 0}
              className="hover:text-[#1E3A8A] flex bg-[#1E3A8A] hover:bg-[#0D9488] text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
            >
              Add Bank
            </button>
          </section>
        )}
        <Container>
          <Table
            data={data?.investments ?? []}
            columns={columns}
            loading={isLoading}
          />
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
    </PageLayout>
  );
};
