import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar";
import "./about.scss";
import Footer from "../../components/Footer/Footer";
import MailList from "../../components/MailList/MailList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faIndianRupeeSign,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function About({ user }) {
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
  return (
    <div className="aboutContainer">
      <div className="aboutWrapper">
        <Navbar data={user} />
        <Header type="list" />
        <div className="aboutData">
          <div className="aboutHead">
            <h3 className="headText">Looking for a Property !</h3>
            <div className="heroTextContainer">
              <h1 className="heroText">Buy</h1>
              <h1 className="heroTextSecond">and</h1>
              <h1 className="heroTextThird">Sell</h1>
            </div>
            <h1 className="heroTextFour">Properties</h1>
            <div className="heroPara">
              <p className="heroParagraph">
                Do you need our help? You have any queries to clarify? Or you
                need someone to guide you with the site? Feel free to contact
                us, our team is always happy to help.
              </p>
            </div>
            <Link to="/">
              <button className="heroHome">Home</button>
            </Link>
            <div className="heroDetails">
              <div className="herophone">
                <label htmlFor="" className="phoneNo">
                  Phone :
                </label>
                <label htmlFor="" className="phoneNo">
                  +91 - 0481 - 2587202
                </label>
              </div>
              <hr />
              <div className="herophone">
                <label htmlFor="" className="phoneNo">
                  Email :
                </label>
                <label htmlFor="" className="phoneNo">
                  hello@hellorealestate.com
                </label>
              </div>
              <hr />
              <p className="heroSecondParagraph">
                Need help in registering your property on our site? Walk in to
                our office with property details and a photograph, our customer
                care team will guide you through the process without any hassle.
                All our offices can offer you service from Monday to Saturday
                between 9 am to 6pm.
              </p>
              <div className="weBest">
                <div className="heroSecondImage">
                  <img
                    src="https://res.cloudinary.com/st-joseph-s-college-of-engineering-and-technology/image/upload/v1660123881/upload/hero_yfrvbr.png"
                    alt=""
                    className="heroSecondImgItem"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="heroImage">
            <img
              src="https://res.cloudinary.com/st-joseph-s-college-of-engineering-and-technology/image/upload/v1660123881/upload/header-bg_bnzjah.png"
              alt=""
              className="heroImgItem"
            />
          </div>
        </div>
        <div className="workingAbout">
          <h1 className="howItwork">HOW IT WORKS</h1>
          <div className="workImages">
            <div className="workImageItem">
              <img
                src="https://res.cloudinary.com/st-joseph-s-college-of-engineering-and-technology/image/upload/v1660123881/upload/p3_ajhfco.png"
                alt=""
                className="workItem"
              />
              <div className="workItemIcon">
                <FontAwesomeIcon icon={faHouseChimney} className="aboutIcon" />
              </div>
              <h4 className="aboutWorkData">Search A Property</h4>
            </div>
            <div className="workImageItem">
              <img
                src="https://res.cloudinary.com/st-joseph-s-college-of-engineering-and-technology/image/upload/v1660123881/upload/p2_b34bz3.png"
                alt=""
                className="workItem"
              />
              <div className="workItemIcon">
                <FontAwesomeIcon
                  icon={faIndianRupeeSign}
                  className="aboutIcon"
                />
              </div>
              <h4 className="aboutWorkData">Find A Property</h4>
            </div>
            <div className="workImageItem">
              <img
                src="https://res.cloudinary.com/st-joseph-s-college-of-engineering-and-technology/image/upload/v1660123881/upload/p1_mj4vzf.png"
                alt=""
                className="workItem"
              />
              <div className="workItemIcon">
                <FontAwesomeIcon icon={faArrowTrendUp} className="aboutIcon" />
              </div>
              <h4 className="aboutWorkData">Buy A Property</h4>
            </div>
          </div>
        </div>
        {dateDif <= 30 && dateDif == 0 ? (
          ""
        ) : (
          <div className="buyAplan">
            <Link style={{ textDecoration: "none" }} to="/payments">
              <div className="planBody">
                <h3 className="textPay">Buy A Plan To continue</h3>
              </div>
            </Link>
          </div>
        )}

        <div style={{ marginTop: "50px" }} className="workingAbout">
          <div className="workImages">
            <div className="workImageItem">
              <img
                style={{ width: "250px" }}
                src="https://res.cloudinary.com/st-joseph-s-college-of-engineering-and-technology/image/upload/v1660123881/upload/s1_ljtb4c.png"
                alt=""
                className="workItem"
              />
              <h4 className="aboutWorkData">Genuine Users</h4>
            </div>
            <div className="workImageItem">
              <img
                style={{ width: "250px" }}
                src="https://res.cloudinary.com/st-joseph-s-college-of-engineering-and-technology/image/upload/v1660123882/upload/s3_qbn9df.png"
                alt=""
                className="workItem"
              />
              <h4 className="aboutWorkData">Genuine Sellers</h4>
            </div>
            <div className="workImageItem">
              <img
                style={{ width: "250px" }}
                src="https://res.cloudinary.com/st-joseph-s-college-of-engineering-and-technology/image/upload/v1660123881/upload/s2_sg7q3w.png"
                alt=""
                className="workItem"
              />
              <h4 className="aboutWorkData">Genuine Buyers</h4>
            </div>
          </div>
        </div>

        <div className="footComponents">
          <MailList />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default About;
