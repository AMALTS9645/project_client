import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Messenger from "../pages/Messenger/Messenger";
import Profile from "../pages/Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import moment from "moment";

export const Navbar = ({ data }) => {
  const details = JSON.parse(localStorage.getItem("details"));
  const cred = JSON.parse(localStorage.getItem("data"));

  const name = details.firstName + " " + details.lastName;
  // console.log(data)
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openModalMessege, setOpenModalMessage] = useState(false);

  const handleClick = () => {
    if (details) {
      setOpenModal(!openModal);
    } else {
      navigate("/login");
    }
  };

  const handleClickMessage = () => {
    if (details) {
      setOpenModalMessage(!openModalMessege);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    localStorage.removeItem("details");
    window.location.reload();
  };

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/${details._id}`
        );
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleUser();
  }, []);

  // console.log(userData)
  const date1 = moment(
    userData.paymentTime ? userData.paymentTime : null
  ).format("DDD");
  const date2 = moment().format("DDD");
  const dateDif = date2 - date1;

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="logo">
          <Link className="link" to="/">
            <h3>REAL ESTATE</h3>
          </Link>
        </div>
        {dateDif <= 30 && dateDif == 0 ? (
          <div className="logoPro">
            <img
              src="https://www.helpage.org/silo/images/pro-logo-white-space_703x351.jpg"
              alt=""
              className="proImg"
            />{" "}
            Account
          </div>
        ) : (
          ""
        )}
        {data ? (
          <ul className="list">
            <div style={{ "display": "flex","alignItems":"center","gap":"1px","marginLeft":"45px" }}>
              <li className="listItem">
                <img style={{ objectFit: "cover" }} src={details.img} />
              </li>
              <li className="listItem">{name}</li>
            </div>
            <li className="listItem mailList" onClick={handleClick}>
              Profile
            </li>
            <li className="listItem message" onClick={handleClickMessage}>
              {" "}
              <FontAwesomeIcon icon={faMessage} />
            </li>
            <li className="listItem" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        ) : (
          <>
            <div className="list">
              <Link className="link" to="/login">
                <li className="listItem">Login</li>
              </Link>
              <Link className="link" to="/signup">
                <li className="listItem">Register</li>
              </Link>
            </div>
          </>
        )}
      </div>
      {openModal && (
        <Profile credentials={cred} data={details} setOpen={setOpenModal} />
      )}
      {openModalMessege && <Messenger setOpen={setOpenModalMessage} />}
    </div>
  );
};

export default Navbar;
