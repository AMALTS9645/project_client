import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./featuredProperties.scss";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/houses/feature?featured=true&limit=4"
  );

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <Link className="linkData" to={`/lists/${item._id}`}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpdesc">{item.desc}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">{item.price}</span>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
