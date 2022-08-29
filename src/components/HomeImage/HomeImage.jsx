import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homeimage.scss";
import moment from "moment";

const HomeImage = () => {
  const [userData, setUserData] = useState([]);

  const owner = JSON.parse(localStorage.getItem("details"));

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

  // console.log(userData)
  const date1 = moment(
    userData.paymentTime ? userData.paymentTime : null
  ).format("DDD");
  const date2 = moment().format("DDD");
  // console.log(date1);
  // console.log(date2);
  const dateDif = date2 - date1;

  // console.log(dateDif);

  return (
    <div className="homeImageLabel">
      <div className="homeImageItem">
        <div className="homeImageSmallHead">
          <h3>ALL PROPERTY NEEDS - ONE PORTAL</h3>
        </div>
        <h1 className="homeImageLargeHead">
          Find Better Places to Live, Work and Wonder...
        </h1>
      </div>
      <div className="homeImageImage">
        <div className="image">
          <img
            src="https://images.pexels.com/photos/3665354/pexels-photo-3665354.jpeg"
            alt=""
            className="homeImageImg"
          />
        </div>
        <div className="homeImageDesc">
          <h3 className="homeImageSideHeadSmall">
            ARE YOU AN OWNER ? POST YOUR PROPERTY
          </h3>
          <h1 className="homeImageSideHeadLarge">
            Property owners get free posting when they register
          </h1>
          <Link to="/payments">
            {dateDif <= 30 && dateDif == 0 ? (
              ""
            ) : (
              <button className="sellPropertybtn">
                Buy a plan to explore details
              </button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeImage;
