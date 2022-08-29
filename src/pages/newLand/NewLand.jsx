import "./newLand.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewLand = ({ inputs, user }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [focused, setFocused] = useState(false);

  const details = JSON.parse(localStorage.getItem("details"));

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
      email: details.email,
      userId: details._id,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/st-joseph-s-college-of-engineering-and-technology/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newLand = {
        ...info,
        photos: list,
      };

      await axios.post("http://localhost:8080/api/lands", newLand);
      toast.success('Land Added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        window.location = "/"
    } catch (error) {
      console.log(error);
      toast.error('Please Fill the details', {
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

  const handleFocus = () => {
    setFocused(true);
  };

  // console.log(info);
  return (
    <div className="new">
      <ToastContainer/>
      <Navbar data={user} />
      <div className="newContainer">
        <Header type="list" />
        <div className="top">
          <h1>Add Land</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image:{" "}
                  <FontAwesomeIcon
                    style={{ cursor: "pointer", fontSize: "30px" }}
                    icon={faCloudArrowUp}
                  />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    required={true}
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                  />
                  <span className="formValid">{input.errorMessage}</span>
                </div>
              ))}
              <div className="formInput">
                <label>Facing</label>
                <select id="facing" onChange={handleChange}>
                  <option value={"East"}>East</option>
                  <option value={"West"}>West</option>
                  <option value={"North"}>North</option>
                  <option value={"South"}>South</option>
                </select>
              </div>
              <div style={{ marginLeft: "10px" }} className="formInput">
                <label>Current and Water Facility</label>
                <select id="isCurrentAndWater" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput">
                <label>featured ?</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button onClick={handleClick}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLand;
