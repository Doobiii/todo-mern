import { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
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
      .post(`https://todo-mern-orpin.vercel.app/api/v1/register`, Inputs)
      .then((response) => {
        // console.log(response);
        if (
          response.data.message === "Email already register in Our Database"
        ) {
          alert(response.data.message);
        } else {
          setInputs({
            email: "",
            username: "",
            password: "",
          });
        }
        history("/signin");
      });
  };

  return (
    <div className="signup container">
      <div className="col my-5 d-flex justify-content-center  align-items-center heading">
        <h1>Sign Up</h1>
      </div>
      <MDBContainer className="p-3 my-auto d-flex flex-column col-md-6 d-flex justify-content-center ">
        <form onSubmit={submit}>
          {" "}
          {/* Wrap input fields in a form element */}
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
            label="Username"
            id="form2"
            type="username"
            name="username"
            onChange={change}
            value={Inputs.username}
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
              {" "}
              {/* Use type="submit" for the submit button */}
              Sign Up
            </MDBBtn>

            <div className="text-center">
              <p>
                Already Registered? <a href="/signin">Login</a>
              </p>
            </div>
          </div>
        </form>
      </MDBContainer>
    </div>
  );
};

export default Signup;
