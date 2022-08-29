import "./forgotPassword.scss";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/password-reset`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <div className="containerf">
      <form action="" className="formContainer" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        {error && <div className="errorMsg">{error}</div>}
        {msg && <div className="successMsg">{msg}</div>}
        <button type="submit" className="greenBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
