import { FC } from "react";
import { GoTrash } from "react-icons/go";
import { userService } from "../../services";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const DeleteButton: FC<DeleteButtonProps> = ({ id, userRole }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => userService.deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully.", { duration: 3000 });
      queryClient.invalidateQueries({
        queryKey: [userRole === "admin" ? "admins" : "users"],
      });
    },
    onError: () => {
      //toast.error(error);
      toast.error("Failed to delete user. Please try again.");
    },
  });
  const onDelete = () => mutate();

  return (
    <button className="p-2" onClick={onDelete}>
      <GoTrash className="hover:text-red-500" />
    </button>
  );
};

export type DeleteButtonProps = {
  id: string;
  userRole: string;
};
