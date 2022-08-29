import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faHouse,
  faList,
  faPlus,
  faSearch,
  faCircleChevronDown,
  faArrowsLeftRight,
  faIndianRupee,
  faCirclePlus,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ type, data }) => {
  const options = [
    { value: "House", label: "House" },
    { value: "Land", label: "Land" },
  ];

  const [dropValue, setDropValue] = useState(options.label);
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  const onSelectCategory = (e) => {
    setDropValue(e.label);
  };

  const handleSearch = () => {
    navigate("/lists", {
      state: { destination, dropValue, options },
    });
  };
  const handleSearchLand = () => {
    navigate("/lands", {
      state: { destination, dropValue, options},
    });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <button
            onClick={() => setOpen(!open)}
            className=" buttonAdd headerListItem"
          >
            <FontAwesomeIcon icon={faPlus} />
            Sell
          </button>
          {open && (
            <div className="addProperty">
              <ul>
                <Link className="link" to="/lists/new">
                  <li>
                    <FontAwesomeIcon icon={faCirclePlus} />
                    Add Building
                  </li>
                </Link>
                <Link className="link" to="/lands/new">
                  <li>
                    <FontAwesomeIcon icon={faCirclePlus} />
                    Add Land
                  </li>
                </Link>
              </ul>
            </div>
          )}
          <Link className="link" to="/about">
            <div className="headerListItem">
              <FontAwesomeIcon icon={faCircleExclamation} />
              <span>About</span>
            </div>
          </Link>
          <Link className="link" to="/support">
            <div className="headerListItem">
              <FontAwesomeIcon icon={faHeadset} />
              <span>Support</span>
            </div>
          </Link>
          <div onClick={handleSearch} className="headerListItem">
            <FontAwesomeIcon icon={faList} />
            <span>Houses</span>
          </div>
          <div onClick={handleSearchLand} className="headerListItem">
            <FontAwesomeIcon icon={faList} />
            <span>Lands</span>
          </div>
          <Link className="link" to="/">
            <div className="headerListItem">
              <FontAwesomeIcon icon={faHouse} />
              <span>Home</span>
            </div>
          </Link>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Find, Buy & Own Your Dream Home</h1>
            <p className="headerDescription">
              Explore from Apartments, land, builder floors, villas and more...
            </p>

            {!data && (
              <button className="headerButton headerListItem">
                <Link className="link" to="/login">
                  Sign in / Register
                </Link>
              </button>
            )}

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faSearch} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Enter Location"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCircleChevronDown}
                  className="headerIcon"
                />
                <Select
                  placeholder="category"
                  className="headerSearchCategory"
                  options={options}
                  onChange={onSelectCategory}
                />
              </div>
              <div className="headerSearchItem">
                {dropValue === "House" ? (
                  <button className="headerButton" onClick={handleSearch}>
                    Search
                  </button>
                ) : (
                  <button className="headerButton" onClick={handleSearchLand}>
                    Search
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
