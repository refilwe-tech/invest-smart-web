import { LiaUserEditSolid } from "react-icons/lia";
import PropTypes from "prop-types";

export const EditButton = ({ onEdit }) => {
  return (
    <button
      className="text-primary hover:text-tertiary p-2 font-medium"
      onClick={onEdit}
    >
      <LiaUserEditSolid className="w-5 h-5" />
    </button>
  );
};

EditButton.propTypes = {
  onEdit: PropTypes.func.isRequired,
};
