import useFetch from "../hooks/useFetch";
import "./propertylist.scss";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/houses/countByType"
  );

  const LandData = () => {
    const { data, loading, error } = useFetch(
      "http://localhost:8080/api/lands/countByTypes"
    );
    return data;
  };

  const lands = LandData();

  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="pListItem">
            <img
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs3/168643830/original/5a0af72b02d5c15fe8de64493b2a8d5c162e99dd/create-your-magnificent-home-design-in-3d-render.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>House</h1>
              <h2>{data} Houses</h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://i0.wp.com/financebuddha.com/blog/wp-content/uploads/2018/01/23174018/land-for-home.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Land</h1>
              <h2>{lands} Lands</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyList;
