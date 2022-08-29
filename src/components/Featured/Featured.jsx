import React from "react";
import useFetch from "../hooks/useFetch";
import "./featured.scss";

const Featured = () => {
  const { data, loading, error} = useFetch(
    "http://localhost:8080/api/houses/countByCity?cities=kottayam,eranakulam,palai"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItems">
            <img
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/143546428/original/2e1c5cf824fcd8aac3da308f4b952f69ab32ce5b/design-and-render-3d-exterior-for-your-house-building-eab7.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Kottayam</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItems">
            <img
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/56828974/original/51bcb418e9844e576046e9732e68168023e4f987/create-3d-model-and-render-images-architecture-project.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Eranakulam</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItems">
            <img
              src="https://fiverr-res.cloudinary.com/image/upload/t_portfolio_project_large,q_auto,f_auto/v1/attachments/project_item/attachment/19a26330692c4e60416178c0a7d07e9b-1655944837682/Final%201_compressed_compressed.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Palai</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
