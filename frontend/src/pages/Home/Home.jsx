import { useEffect, useState } from "react";
import Card from "../todocard/Card";
import "./home.css";
import Update from "../Update";
import axios from "axios";
let id = sessionStorage.getItem("id");
let username = sessionStorage.getItem("username");
let todoArray = [];
const Home = () => {
  const [Inputs, setInputs] = useState({ todoList: "" });
  const [Array, SetArray] = useState([]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async () => {
    if (id) {
      await axios.post(`https://todo-mern-3.onrender.com/api/v2/addTask`, {
        todoList: Inputs.todoList,
        id: id,
      });
      // .then(() => {
      //   console.log(id);
      // });

      setInputs({ todoList: "" });
    } else {
      SetArray([...Array, Inputs]);
      setInputs({ todoList: "" });
    }
  };
  const del = async (Cardid) => {
    if (id) {
      await axios
        .delete(
          `https://todo-mern-3.onrender.com/api/v2/deleteTask/${Cardid}`,
          {
            data: { id: id },
          }
        )
        .then(() => {
          alert("Task is Deleted");
        });
    }
    // console.log(id);
  };
  const dis = (value) => {
    // console.log(value);
    document.getElementById("todo-update").style.display = value;
  };
  const update = (value) => {
    todoArray = Array[value];
    // console.log(todoArray.todoList);
  };
  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios
          .get(`https://todo-mern-3.onrender.com/api/v2/getTasks/${id}`)
          .then((response) => {
            // console.log(id);
            SetArray(response.data.list);
          });
      };
      fetch();
    }
  }, [Array]);
  return (
    <>
      <div className="container home todo">
        <div className="my-4 p-2  d-flex justify-content-center align-items-center">
          {username && (
            <h3 className="display-4">
              Welcome <span className="usr">{username}</span>
            </h3>
          )}
        </div>
        <div className="container todo-main  d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex flex-column todo-inputs w-50 p-2">
            <input
              type="text"
              placeholder="Enter Todo"
              className="my-2 p-2"
              name="todoList"
              value={Inputs.todoList}
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-end py-2">
            <button className="btn btn-light " onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container">
            <div className="row mx-5 my-2 ">
              {Array &&
                Array.map((item, index) => (
                  <div key={index} className="my-2 xx">
                    <Card
                      todoList={item.todoList}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdated={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update display={dis} update={todoArray} />
        </div>
      </div>
    </>
  );
};

export default Home;
