import "./searchItem.scss";
import {
  faCaretRight,
  faIndianRupeeSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  // console.log(item)
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <p>{item.city}</p>
        <span className="siPlotArea">
          <FontAwesomeIcon icon={faCaretRight} />
          {item.plotArea} cent · facing {item.facing}
        </span>
        {item.isCurrentAndWater && (
          <span className="siFacility">
            <FontAwesomeIcon icon={faCaretRight} />
            current · water facility
          </span>
        )}
        {/* <span className="siDetails">Description</span> */}
        <span className="siDistance">
          <FontAwesomeIcon icon={faCaretRight} />
          {item.distance}
        </span>
        
        <span className="siFeatures">
          <FontAwesomeIcon icon={faCaretRight} />
          {item.bedRoom}bhk · {item.bathRoom}bathrooms · {item.balcony}balconies{" "}
          {item.isPlayGround && "· childrens play ground"}
        </span>
        <span className="siConsStatus">
          <FontAwesomeIcon icon={faCaretRight} />
          {item.furnishing} · total {item.floors} floors
        </span>

        <span className="siGarden">
          {item.isGarden || item.isCarParking ? (
            <FontAwesomeIcon icon={faCaretRight} />
          ) : (
            ""
          )}
          {item.isGarden && "outdoor garden"}
          {item.isCarParking && " car parking"}
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
        <Link to={`/lists/${item._id}`}>
        <button className="siCheckButton">See Details</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchItem;
