import {
  faCheckCircle,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faCompass,
  faIndianRupeeSign,
  faLocationCrosshairs,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar";
import MailList from "../../components/MailList/MailList";
import Footer from "../../components/Footer/Footer";
import "./singleListItem.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../components/hooks/useFetch.js";
import Reserve from "../Reserve/Reserve";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const SingleListItem = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/houses/find/${id}`
  );

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [files, setFiles] = useState("");
  const [imageUpdateMode, setImageUpdateMode] = useState(false);
  const [userData, setUserData] = useState("");

  const [myFormFields, setFormFields] = useState({
    name: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    listedBy: "",
    price: "",
    bedRoom: "",
    bathRoom: "",
    balcony: "",
    floors: "",
    plotArea: "",
    furnishing: "",
    facing: "",
    isPlayGround: "",
    isCarParking: "",
    isCurrentAndWater: "",
    isGarden: "",
  });

  useEffect(() => {
    setFormFields({
      ...myFormFields,
      name: data.name,
      city: data.city,
      address: data.address,
      distance: data.distance,
      title: data.title,
      desc: data.desc,
      listedBy: data.listedBy,
      price: data.price,
      bedRoom: data.bedRoom,
      bathRoom: data.bathRoom,
      balcony: data.balcony,
      floors: data.floors,
      plotArea: data.plotArea,
      furnishing: data.furnishing,
      facing: data.facing,
      isPlayGround: data.isPlayGround,
      isCarParking: data.isCarParking,
      isCurrentAndWater: data.isCurrentAndWater,
      isGarden: data.isGarden,
    });
  }, [updateMode]);

  const owner = JSON.parse(localStorage.getItem("details"));
  // console.log(data.userId)

  useEffect(() => {
    const handleUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/${owner._id}`
        );
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleUser();
  }, []);

  // console.log(userData);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handlePayment = () => {
    navigate("/payments");
  };

  const onFormFieldChange = (e) => {
    setFormFields({
      ...myFormFields,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdateData = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        ...myFormFields,
        email: owner.email,
      };
      console.log(newPost);
      await axios.put(`http://localhost:8080/api/houses/update/${id}`, newPost);
      setUpdateMode(false);
      window.location.reload();
      toast.success("Property Updated", {
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
      toast.error(error, {
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

  const handleImage = (e) => {
    setFiles(e.target.files);
    setImageUpdateMode(true);
  };

  const updateAllImages = async (e) => {
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
          console.log(uploadRes);
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newImages = {
        photos: list,
        email: owner.email,
      };

      await axios.put(
        `http://localhost:8080/api/houses/update/${id}`,
        newImages
      );
      toast.success("New Images Added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location = "/";
    } catch (error) {
      console.log(error);
      toast.error(error, {
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

  const date1 = moment(
    userData.paymentTime ? userData.paymentTime : null
  ).format("DDD");
  const date2 = moment().format("DDD");
  const dateDif = date2 - date1;

  return (
    <div>
      <Navbar data={user} />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="singleItemContainer">
          <ToastContainer />
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                className="close"
                icon={faCircleXmark}
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                className="arrow"
                icon={faCircleArrowLeft}
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                className="arrow"
                icon={faCircleArrowRight}
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="singleItemWrapper">
            {updateMode && (
              <FontAwesomeIcon
                className="xMark"
                icon={faXmark}
                onClick={() => setUpdateMode(false)}
              />
            )}
            {updateMode ? (
              <button className="bookNow" onClick={onUpdateData}>
                Save
              </button>
            ) : (
              data.userId === owner._id && (
                <button
                  className="bookNow"
                  onClick={(e) => setUpdateMode(!updateMode)}
                >
                  Edit
                </button>
              )
            )}
            {updateMode ? (
              <div className="detailItem">
                <span className="itemKey">Name:</span>
                <input
                  name="name"
                  className="nameInput"
                  type="text"
                  value={myFormFields.name || ""}
                  onChange={onFormFieldChange}
                />
              </div>
            ) : (
              <h1 className="singleItemTitle">{data.name}</h1>
            )}
            {updateMode ? (
              <div className="detailItem">
                City
                <input
                  name="city"
                  className="nameInput"
                  type="text"
                  value={myFormFields.city || ""}
                  onChange={onFormFieldChange}
                />
              </div>
            ) : (
              <div className="singleItemAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.city}</span>
              </div>
            )}
            {updateMode ? (
              <div className="detailItem">
                Address
                <input
                  name="address"
                  className="nameInput"
                  type="text"
                  value={myFormFields.address || ""}
                  onChange={onFormFieldChange}
                />
              </div>
            ) : (
              <div className="singleItemAddress">
                <FontAwesomeIcon icon={faLocationCrosshairs} />
                <span>{data.address}</span>
              </div>
            )}
            {updateMode ? (
              <div className="detailItem">
                <label>Facing</label>
                <select
                  value={myFormFields.facing || ""}
                  id="facing"
                  name="facing"
                  onChange={onFormFieldChange}
                >
                  <option value={"East"}>East</option>
                  <option value={"West"}>West</option>
                  <option value={"North"}>North</option>
                  <option value={"South"}>South</option>
                </select>
              </div>
            ) : (
              <div className="singleItemAddress">
                <FontAwesomeIcon icon={faCompass} />
                <span>Facing {data.facing}</span>
              </div>
            )}
            {updateMode ? (
              <div className="detailItem">
                Distance
                <input
                  name="distance"
                  className="nameInput"
                  type="text"
                  value={myFormFields.distance || ""}
                  onChange={onFormFieldChange}
                />
              </div>
            ) : (
              <span className="singleItemDistance">
                Excellent location - {data.distance}
              </span>
            )}
            <h3 className="singleItemData">Reasons to choose this property</h3>
            <div className="singleItemFeatures">
              {updateMode ? (
                <div className="detailItem">
                  Plot Area
                  <input
                    name="plotArea"
                    className="nameInput"
                    type="number"
                    value={myFormFields.plotArea || ""}
                    onChange={onFormFieldChange}
                  />
                </div>
              ) : (
                <span className="singleItemFeature">{data.plotArea} cent</span>
              )}
              {!updateMode && data.furnishing === "Furnished" && (
                <span className="singleItemFeature">Ready to move</span>
              )}
              {updateMode ? (
                <div className="detailItem">
                  <label>Furnishing</label>
                  <select
                    value={myFormFields.furnishing || ""}
                    id="furnishing"
                    name="furnishing"
                    onChange={onFormFieldChange}
                  >
                    <option value={"Furnished"}>Furnished</option>
                    <option value={"Semi-Furnished"}>Semi-Furnished</option>
                    <option value={"UnFurnished"}>UnFurnished</option>
                  </select>
                </div>
              ) : (
                <span className="singleItemFeature">{data.furnishing}</span>
              )}
              {updateMode ? (
                <div className="detailItem">
                  Floors
                  <input
                    name="floors"
                    className="nameInput"
                    type="number"
                    value={myFormFields.floors || ""}
                    onChange={onFormFieldChange}
                  />
                </div>
              ) : (
                <span className="singleItemFeature">
                  total {data.floors} floors
                </span>
              )}
              {updateMode ? (
                <div className="detailItem">
                  <label>Current and Water Facility</label>
                  <select
                    value={myFormFields.isCurrentAndWater}
                    name="isCurrentAndWater"
                    onChange={onFormFieldChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              ) : (
                data.isCurrentAndWater && (
                  <span className="singleItemFeature">
                    current and water facility
                  </span>
                )
              )}
              {updateMode ? (
                <div className="detailItem">
                  <label>Garden ?</label>
                  <select
                    value={myFormFields.isGarden}
                    name="isGarden"
                    onChange={onFormFieldChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              ) : (
                data.isGarden && (
                  <span className="singleItemFeature">Outdoor garden</span>
                )
              )}
              {updateMode ? (
                <div className="detailItem">
                  <label>Car Parking Facility</label>
                  <select
                    value={myFormFields.isCarParking}
                    name="isCarParking"
                    onChange={onFormFieldChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              ) : (
                data.isCarParking && (
                  <span className="singleItemFeature">Car parking</span>
                )
              )}
              {updateMode ? (
                <div className="detailItem">
                  BedRooms
                  <input
                    name="bedRoom"
                    className="nameInput"
                    type="number"
                    value={myFormFields.bedRoom || ""}
                    onChange={onFormFieldChange}
                  />
                </div>
              ) : (
                <span className="singleItemFeature">{data.bedRoom}bhk</span>
              )}
              {updateMode ? (
                <div className="detailItem">
                  BathRooms
                  <input
                    name="bathRoom"
                    className="nameInput"
                    type="number"
                    value={myFormFields.bathRoom || ""}
                    onChange={onFormFieldChange}
                  />
                </div>
              ) : (
                <span className="singleItemFeature">
                  {data.bathRoom} bathrooms
                </span>
              )}
              {updateMode ? (
                <div className="detailItem">
                  Balcony
                  <input
                    name="balcony"
                    className="nameInput"
                    type="number"
                    value={myFormFields.balcony || ""}
                    onChange={onFormFieldChange}
                  />
                </div>
              ) : (
                <span className="singleItemFeature">
                  {data.balcony} balconies
                </span>
              )}
              {updateMode ? (
                <div className="detailItem">
                  <label>Children's Play Ground</label>
                  <select
                    value={myFormFields.isPlayGround}
                    name="isPlayGround"
                    onChange={onFormFieldChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              ) : (
                data.isPlayGround && (
                  <span className="singleItemFeature">
                    children's play ground
                  </span>
                )
              )}
            </div>
            {updateMode ? (
              imageUpdateMode ? (
                <div
                  style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <img
                      className="imageImage"
                      src={
                        files
                          ? URL.createObjectURL(files[0])
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                    <img
                      className="imageImage"
                      src={
                        files
                          ? URL.createObjectURL(files[1])
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                    <img
                      className="imageImage"
                      src={
                        files
                          ? URL.createObjectURL(files[2])
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                    <img
                      className="imageImage"
                      src={
                        files
                          ? URL.createObjectURL(files[3])
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                    <img
                      className="imageImage"
                      src={
                        files
                          ? URL.createObjectURL(files[4])
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                    <img
                      className="imageImage"
                      src={
                        files
                          ? URL.createObjectURL(files[5])
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="saveEdittBtn" onClick={updateAllImages}>
                    Save
                    <FontAwesomeIcon icon={faCheckCircle} className="rClose" />
                  </div>
                </div>
              ) : (
                <div className="saveEdittBtn">
                  <label htmlFor="file">
                    Add Image:{" "}
                    <FontAwesomeIcon
                      style={{ cursor: "pointer", fontSize: "30px" }}
                      icon={faCloudArrowUp}
                    />
                  </label>
                  <input
                    type="file"
                    id="file"
                    multiple
                    onChange={handleImage}
                    style={{ display: "none" }}
                  />
                </div>
              )
            ) : (
              <div className="singleItemImages">
                {data.photos?.map((photo, i) => (
                  <div className="singleItemImageWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="singleItemImage"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="singleItemDetails">
              <div className="singleItemDetailsTexts">
                {updateMode ? (
                  <div className="detailItem">
                    Title
                    <input
                      name="title"
                      className="nameInput"
                      type="text"
                      value={myFormFields.title || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <h1 className="singleItemTitle">{data.title}</h1>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    Description
                    <textarea
                      name="desc"
                      className="nameDesc"
                      type="textarea"
                      value={myFormFields.desc || ""}
                      onChange={onFormFieldChange}
                    ></textarea>
                  </div>
                ) : (
                  <p className="singleItemDesc">{data.desc}</p>
                )}
              </div>
              <div className="singleItemDetailsPrice">
                <h1>Reserve this property now !</h1>
                <span>Listed by {data.listedBy}</span>
                <span>Posted {format(data.createdAt)}</span>
                <span>Updated {format(data.updatedAt)}</span>
                {updateMode ? (
                  <div className="detailItem">
                    Price
                    <input
                      name="price"
                      className="nameInput"
                      type="text"
                      value={myFormFields.price || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <h2>
                    <b>
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {data.price}
                    </b>
                  </h2>
                )}
                {data.userId !== owner._id ? (
                  dateDif <= 30 && dateDif == 0 ? (
                    <button className="chatOpen" onClick={handleClick}>
                      Chat now !
                    </button>
                  ) : (
                    <button className="chatOpen" onClick={handlePayment}>
                      For more Details Click here
                    </button>
                  )
                ) : updateMode ? (
                  <button className="chatOpen" onClick={onUpdateData}>
                    Save
                  </button>
                ) : (
                  <button
                    className="chatOpen"
                    onClick={(e) => setUpdateMode(!updateMode)}
                  >
                    Edit
                  </button>
                )}
                <div className="chatNow">
                  {openModal && <Reserve data={data} setOpen={setOpenModal} />}
                </div>
              </div>
            </div>
          </div>
          <MailList />
          <br />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default SingleListItem;
// import { useLocation } from "react-router";
// import { posts } from "../../data";

// const SingleListItem = () => {
//   const location = useLocation();
//   const path = location.pathname.split("/")[2];

//   const post = posts.find((p) => p.id.toString() === path);
//   return (
//     <div className="post">
//       <img src={post.img} alt="" className="postImg" />
//       <h1 className="postTitle">{post.title}</h1>
//       <p className="postDesc">{post.desc}</p>
//       <p className="postLongDesc">{post.longDesc}</p>
//     </div>
//   );
// };

// export default SingleListItem;
