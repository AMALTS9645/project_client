import "./signup.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      toast.success("Registered Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        toast.error("Enter the user credentials", {
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
    <div className="signupContainer">
      <ToastContainer />
      <div className="signupFormContainer">
        <div className="left">
          <h1>WELCOME BACK</h1>
          <Link to="/login">
            <button type="button" className="whiteBtn">
              Sign In
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="formContainer" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              onChange={handleChange}
              value={data.country}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={handleChange}
              value={data.city}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
              value={data.phone}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error && <div className="errorMsg">{error}</div>}
            {msg && <div className="successMsg">{msg}</div>}
            <button type="submit" className="greenBtn">
              Sign Up
            </button>
            <h6 className="privacyPolicy">
              By clicking the "Sign up" button, you are creating an account, and
              agree to
              <span
                style={{
                  color: "green",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Terms of Service and Privacy Policy
              </span>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
