import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./reserve.scss";

const Reserve = ({ setOpen, data }) => {
  const [postOwner, setPostOwner] = useState("");
  const details = JSON.parse(localStorage.getItem("details"));

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/${data.userId}`
        );
        setPostOwner(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, [data]);

  const handleChat = async () => {
    const members = {
      senderId: details._id,
      receiverId: postOwner._id,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/api/conversations",
        members
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
      </div>
      <div className="chatConfirm">
        <div className="chatText">
          Do You Want To Chat With {postOwner.firstName} {postOwner.lastName} ?
        </div>
        <Link className="link" to="/messenger">
          <div onClick={handleChat} className="btnClick">
            <button className="chatButton">Chat Now</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Reserve;
