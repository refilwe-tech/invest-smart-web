import { LiaUserEditSolid } from "react-icons/lia";
import type { FC } from "react";
import { IoMdUndo } from "react-icons/io";
import { Button } from "./button";

export type EditButtonProps = {
  isEdit: boolean;
  title?: string;
  onClick: () => void;
};
export const EditButton: FC<EditButtonProps> = ({
  onClick,
  isEdit,
  title = "Profile",
}) => {
  return (
    <Button
      variant="gradient"
      type="button"
      className={`${!isEdit ? "bg-tertiary rounded-xl text-white" : "text-red-500"} hover:text-blue-700 font-medium flex items-center gap-2"`}
      onClick={onClick}
    >
      {isEdit ? (
        <>
          <IoMdUndo /> Cancel Edit{" "}
        </>
      ) : (
        <>
          <LiaUserEditSolid className="w-5 h-5" /> Edit {`${title}`}
        </>
      )}
    </Button>
  );
};
