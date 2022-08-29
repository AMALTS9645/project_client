import "./addTicket.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ticketInputs } from "../../formSource";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTicket({ setopen }) {
  const details = JSON.parse(localStorage.getItem("details"));

  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
      clientId: details._id,
    }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      const newTicket = {
        ...info,
        clientId: details._id,
      };
      // console.log(newPost);
      await axios.post(`http://localhost:8080/api/tickets`, newTicket);
      toast.success("Ticket Added", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.reload();
      // setopen(false);
    } catch (error) {
      console.log(error);
      toast.error("Fill all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // console.log(info);
  return (
    <div>
      <ToastContainer />
      <div onClick={(e) => setopen(false)} className="closeButton">
        <div className="closeBtnTicket">
          <FontAwesomeIcon className="iconCloseTkt" icon={faXmark} />
        </div>
      </div>
      <div className="tktInput">
        {ticketInputs.map((input) => (
          <div className="formInput" key={input.id}>
            <label>{input.label} :</label>
            <input
              required={true}
              id={input.id}
              onChange={handleChange}
              type={input.type}
              placeholder={input.placeholder}
              // onBlur={handleFocus}
              // focused={focused.toString()}
            />
            <span className="formValid">{input.errorMessage}</span>
          </div>
        ))}
        <div className="detailItem">
          Details
          <textarea
            id="details"
            name="det"
            className="nameDesc"
            type="textarea"
            placeholder="Details"
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <button onClick={handleSubmit} className="addTicketBtn">
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddTicket;
