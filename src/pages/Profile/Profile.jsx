import "./profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCloudArrowUp,
  faFloppyDisk,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Datatable from "../../components/datatable/Datatable";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ setOpen, data, credentials }) => {
  //   const location = useLocation();
  //   const id = location.pathname.split("/")[2];
  //   // const lists = location.state.list;
  //   const item = location.state.list.filter((item) => item._id === id);
  //   const data = item[0];
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [country, setCountry] = useState(data.country);
  const [city, setCity] = useState(data.city);
  const [password, setPassword] = useState(credentials.password);
  const [updateMode, setUpdateMode] = useState(false);
  const [imgUpdateMode, setImgUpdateMode] = useState(false);

  const id = data._id;

  const handleUpdata = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        country: country,
        city: city,
        password: password,
      };
      console.log(newUser);
      window.location.reload();
      setUpdateMode(false);
      await axios.put(`http://localhost:8080/api/users/${id}`, newUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/st-joseph-s-college-of-engineering-and-technology/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        img: url,
      };
      console.log(newUser);
      window.location.reload();
      setImgUpdateMode(false);
      await axios.put(`http://localhost:8080/api/users/${id}`, newUser);
      toast.success("Photo changed.. Login again to see", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single">
      {/* <Navbar /> */}
      <ToastContainer />
      <div className="singleContainer">
        {/* <Header /> */}
        <div className="top">
          <div className="left">
            <div className="editButton">
              <div onClick={() => setOpen(false)} className="closeButtons">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" />
              </div>
            </div>
            <h1 className="title">User Dashboard</h1>

            <div className="item">
              {imgUpdateMode ? (
                <>
                  <div className="imgItem">
                    <img
                      src={file ? URL.createObjectURL(file) : data.img}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "50px",
                      fontSize: "15px",
                    }}
                  >
                    <label style={{ cursor: "pointer" }} htmlFor="file">
                      Image:{" "}
                      <FontAwesomeIcon icon={faCloudArrowUp} className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    <div onClick={handleImage} style={{ cursor: "pointer" }}>
                      Save{" "}
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="rClose"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img src={data.img} alt="" className="itemImg" />
                  <div
                    onClick={() => setImgUpdateMode(true)}
                    className="editButtons"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                  </div>
                </>
              )}
              <div className="details">
                {updateMode ? (
                  <div className="userdetails">
                    firstName{" "}
                    <input
                      className="nameInput"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    lastName{" "}
                    <input
                      className="nameInput"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                ) : (
                  <h1 className="itemTitle">
                    {data.firstName} {data.lastName}
                  </h1>
                )}
                {updateMode ? (
                  <div className="userdetails">
                    email{" "}
                    <input
                      className="nameInput"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{data.email}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="userdetails">
                    phone{" "}
                    <input
                      className="nameInput"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{data.phone}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="userdetails">
                    country{" "}
                    <input
                      className="nameInput"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">{data.country}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="userdetails">
                    city{" "}
                    <input
                      className="nameInput"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">City:</span>
                    <span className="itemValue">{data.city}</span>
                  </div>
                )}
                {updateMode && (
                  <div className="userdetails">
                    password{" "}
                    <input
                      className="nameInput"
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
                {updateMode ? (
                  <div onClick={handleUpdata} className="savebuttons">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    Save
                  </div>
                ) : (
                  <div
                    onClick={() => setUpdateMode(true)}
                    className="editButtons"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                  </div>
                )}
              </div>
            </div>
            <Link to={`/MyItem`}>
              <button type="button" className="myPost">
                My Posts
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
