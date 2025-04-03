import { Container } from "../../layouts";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../../services";
import { TfiStatsUp } from "react-icons/tfi";
import { HiUsers } from "react-icons/hi";
import { ClipLoader } from "react-spinners";

export const HomePage=()=> {
  const { data, isLoading } = useQuery({
    queryKey: ["counts"],
    queryFn: dashboardService.getCounts,
  });
  return (
    <section className="flex flex-col gap-2">
      <h3>Welcome {"Admin"}</h3>
      {isLoading ? <section className="flex justify-center gap-2">
          <ClipLoader className=" text-primary" /> Loading...
        </section>: <section className="flex gap-4 w-full">
        <Container>
          <>
            <section className="flex justify-between items-center">
              <h4 className="text-2xl text-center">Total Users</h4>
              <HiUsers className="w-5 h-5" />
            </section>
            <section className="flex flex-col gap-1 justify-center items-center p-4">
              <h2 className="text-center font-medium text-7xl">
                {data?.totalUsers}
              </h2>
              <p>Total Active Users</p>
            </section>
          </>
        </Container>
        <Container>
          <>
            <section className="flex justify-between items-center">
              <h4 className="text-2xl text-center">Total Investment Options</h4>
              <TfiStatsUp className="w-5 h-5" />
            </section>
            <section className="flex flex-col gap-1 justify-center items-center p-4">
              <h2 className="text-center font-medium text-7xl">
                {data?.totalInvestments}
              </h2>
              <p>Total Active Banks</p>
            </section>
          </>
        </Container>
      </section>}
    </section>
  );
}