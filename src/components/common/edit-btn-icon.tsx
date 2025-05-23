import { LiaUserEditSolid } from "react-icons/lia";

export const EditBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    title="Edit"
    type="button"
    className={"text-tertiary hover:text-blue-700 p-2 font-medium flex gap-2"}
    onClick={onClick}
  >
    <LiaUserEditSolid className="w-5 h-5" />
  </button>
);
