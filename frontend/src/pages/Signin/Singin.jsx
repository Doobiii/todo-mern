import "./signin.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../stores";

import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";

const Singin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    // console.log(Inputs);
    await axios
      .post(`${window.location.origin}/api/v1/signin`, Inputs)
      .then((response) => {
        // console.log(response.data);
        if (response.data.message === "Password not correct") {
          setInputs({
            password: "",
          });
          return alert(response.data.message);
        }
        if (response.data.message === "Signup first") {
          setInputs({
            email: "",
            password: "",
          });
          history("/signup");
          return alert(response.data.message);
        } else {
          // if (response.data.length !== 1) {
          setInputs({
            email: "",
            password: "",
          });
          sessionStorage.setItem("id", response.data.others._id);
          sessionStorage.setItem("username", response.data.others.username);
          // console.log(response);
          dispatch(authActions.login());
          history("/");
          window.location.reload();
        }
      });
  };

  return (
    <div className="signup container ">
      <div className="col my-5 d-flex justify-content-center align-items-center heading container">
        <h1>Sign In</h1>
      </div>
      <form onSubmit={submit}>
        <MDBContainer className="p-3 my-auto d-flex flex-column col-md-6 d-flex justify-content-center ">
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            name="email"
            onChange={change}
            value={Inputs.email}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form3"
            type="password"
            name="password"
            onChange={change}
            value={Inputs.password}
          />

          <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBBtn className="mb-4" type="submit">
              Login
            </MDBBtn>

            <div className="text-center">
              <p>
                Not a member? <a href="/signup">Register</a>
              </p>
            </div>
          </div>
        </MDBContainer>
      </form>
    </div>
  );
};

export default Singin;
