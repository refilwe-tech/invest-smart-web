import { Heading } from "@project/components/common";
import { EditAdminForm } from "@project/components/forms";
import { PageLayout } from "@project/components/layouts";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { MdOutlineCloseFullscreen } from "react-icons/md";

export const EditAdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { userId } = useParams({ strict: false });
  const isOpen = useMemo(
    () => pathname == `/admins/${userId}/edit`,
    [pathname]
  );
  const close = () => navigate({ to: "/admins", replace: true });
  console.log(isOpen, pathname);
  return (
    <PageLayout>
      <section
        className={`fixed flex flex-col gap-4 h-screen py-4 px-3 top-0 bottom-0 bg-slate-50 right-0 w-300 z-50 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:w-full sm:max-w-md`}
      >
        <button className="absolute top-0 right-0 p-5" onClick={close}>
          <MdOutlineCloseFullscreen className="w-8 h-8 hover:text-primary-dark" />
        </button>
        <Heading heading="Edit Admin" />
        <EditAdminForm />
      </section>
    </PageLayout>
  );
};
