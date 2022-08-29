import "./login.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      localStorage.setItem("data", JSON.stringify(data));
      localStorage.setItem("details", JSON.stringify(res.details));
      window.location = "/";
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // console.log(res.details);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        toast.error("Enter Correct Username and Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="loginContainer">
      <ToastContainer />
      <div className="loginFormContainer">
        <div className="first">
          <form className="formContainer" onSubmit={handleSubmit}>
            <h2>Login to Your Account</h2>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="inputs"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="inputs"
            />
            <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
              <p style={{ padding: "0 15px" }}>Forgot Password</p>
            </Link>
            {error && <div className="errorMsgs">{error}</div>}
            <button type="submit" className="signInBtn">
              Sign In
            </button>
          </form>
        </div>
        <div className="second">
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="signBtn">
              Sign Up
            </button>
          </Link>
          <h4>Register for free</h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
