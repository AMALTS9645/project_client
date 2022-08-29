import "./list.scss";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import SearchItem from "../../components/SearchItem/SearchItem";
import useFetch from "../../components/hooks/useFetch.js";
import axios from "axios";

const List = ({ user }) => {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state.destination || ""
  );
  const [dropValue, setDropValue] = useState(location.state.dropValue || "");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [plot, setPlot] = useState("");
  const [filterData, setFilterData] = useState("");

  const option = [
    {
      value: "House",
      label: "House",
    },
  ];

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8080/api/houses?city=${destination || ""}&min=${
      min || 0
    }&max=${
      max || 999
    }&plot=${plot}`
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/houses`);
        setFilterData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar data={user} />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Category</label>
              <span>
                <Select placeholder={dropValue} options={option} />
              </span>
            </div>
            <div className="lsItem">
              <div className="lsOptionItem">
                <label>Location</label>
                <input
                  placeholder={destination}
                  type="text"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            <div className="lsAll">
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min-Price</span>
                  <input
                    placeholder=""
                    min={1}
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max-Price</span>
                  <input
                    placeholder=""
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Plot Area</span>
                  <input
                    placeholder="7"
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setPlot(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {data ? (
            <div>
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            </div>
          ) : (
            ""
          )}
          <div className="listResult">
            {filterData &&
              filterData.map((item) => (
                <SearchItem item={item} key={item._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
