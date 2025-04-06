import { LiaUserEditSolid } from "react-icons/lia";
import { FC } from "react";
import { IoMdUndo } from "react-icons/io";

export type EditButtonProps = {
  isEdit: boolean;
  onClick: () => void;
};
export const EditButton: FC<EditButtonProps> = ({ onClick, isEdit }) => {
  return (
    <button
      className={`${!isEdit ? "text-tertiary" : "text-red-500"} hover:text-blue-700 p-2 font-medium flex gap-2"`}
      onClick={onClick}
    >
      {isEdit ? (
        <>
          <IoMdUndo /> Cancel Edit{" "}
        </>
      ) : (
        <>
          <LiaUserEditSolid className="w-5 h-5" /> Edit Profile{" "}
        </>
      )}
    </button>
  );
};
