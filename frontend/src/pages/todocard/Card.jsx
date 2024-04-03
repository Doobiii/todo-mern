import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import PropTypes from "prop-types";
const Card = ({ todoList, id, delid, display, updateId, toBeUpdated }) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h6>{todoList}</h6>
      </div>
      <div className="d-flex justify-content-around ">
        <div
          className="card-icon-head"
          onClick={() => {
            display("block");
            toBeUpdated(updateId);
          }}
        >
          <AiFillEdit className="card-icons  mr-2" /> Update
        </div>
        <div
          className="card-icon-head text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <AiFillDelete className="card-icons del " />
          Delete
        </div>
      </div>
    </div>
  );
};
Card.propTypes = {
  todoList: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  delid: PropTypes.func.isRequired,
  display: PropTypes.func.isRequired,
  updateId: PropTypes.number.isRequired,
  toBeUpdated: PropTypes.func.isRequired,
};

export default Card;
