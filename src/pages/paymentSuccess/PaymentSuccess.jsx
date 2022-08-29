import "./paymentSuccess.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const PaymentSuccess = () => {
  const user = JSON.parse(localStorage.getItem("details"));
  const searchQuery = useSearchParams()[0];
  const refNo = searchQuery.get("reference");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const newUser = {
        paymentId: refNo,
        paymentTime: Date.now(),
      };
      // console.log(newUser);
      await axios.put(`http://localhost:8080/api/users/${user._id}`, newUser);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pSuccess">
      <div className="pSuccessWrapper">
        <div className="successItems">
          <div className="verified">
            <h1>Payment Success</h1>
            <FontAwesomeIcon icon={faCheckSquare} />
          </div>
          <div className="redID">reference id : {refNo}</div>
          <button onClick={handleClick} className="redirectBtn">
            Go back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
