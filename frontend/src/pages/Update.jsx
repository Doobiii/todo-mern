import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
const Update = ({ display, update }) => {
  const [Inputs, setInputs] = useState({
    todoList: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  useEffect(() => {
    setInputs({ todoList: update.todoList });
  }, [update]);
  const submit = async () => {
    await axios
      .post(
        `https://todo-mern-3.onrender.com/api/v2/updateTask/${update._id}`,
        Inputs
      )
      .then((response) => {
        alert(response.data.message);
      });
    display("none");
    // console.log(Inputs);
  };
  // console.log(update);

  return (
    <div className="p-5  d-flex flex-column align-items-start justify-content-center update">
      <h2>Update your Task</h2>

      <div className="w-100 my-10 todo-inputs p-2">
        <input
          type="text"
          placeholder="Enter Todo"
          className="my-4 p-2 w-100"
          name="todoList"
          value={Inputs.todoList}
          // value="{Inputs.todoList}"
          onChange={change}
        />

        <div className="w-50  py-2">
          <button className="btn btn-light  mr-2" onClick={submit}>
            Update
          </button>
          <button
            className="btn btn-light "
            onClick={() => {
              display("none");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Update.propTypes = {
  display: PropTypes.func.isRequired,
  update: PropTypes.object.isRequired,
};

export default Update;
