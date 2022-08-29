import "./landSearchItem.scss";
import {
  faCaretRight,
  faIndianRupeeSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const LandSearchItem = ({ item }) => {
  // console.log(item)
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <p>{item.city}</p>
        <span className="siPlotArea">
          <FontAwesomeIcon icon={faCaretRight} />
          {item.plotArea} cent
        </span>
        <span className="siPlotArea">
          <FontAwesomeIcon icon={faCaretRight} />
          facing {item.facing}
        </span>
        {item.isCurrentAndWater && (
          <span className="siFacility">
            <FontAwesomeIcon icon={faCaretRight} />
            current facility
          </span>
        )}
        {item.isCurrentAndWater && (
          <span className="siFacility">
            <FontAwesomeIcon icon={faCaretRight} />
            water facility
          </span>
        )}
        {/* <span className="siDetails">Description</span> */}
        <span className="siDistance">
          <FontAwesomeIcon icon={faCaretRight} />
          {item.distance}
        </span>

      </div>
      <div className="sideDetails">
        <span className="siListedBy">
          <FontAwesomeIcon icon={faUser} />
          listed by {item.listedBy}
        </span>
        <h1 className="siPrice">
          <FontAwesomeIcon icon={faIndianRupeeSign} /> {item.price}
        </h1>
        <Link to={`/lands/${item._id}`}>
        <button className="siCheckButton">See Details</button>
        </Link>
      </div>
    </div>
  );
};

export default LandSearchItem;
