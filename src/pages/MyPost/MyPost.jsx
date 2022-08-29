import { Link } from "react-router-dom";
import Datatable from "../../components/datatable/Datatable";
import DatatableLand from "../../components/datatableLand/DatatableLand";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar";
import "./MyPost.scss";

const MyPost = ({ user }) => {
  return (
    <>
      <div className="postData">
        <Navbar data={user} />
        <Header type="list" />
        <Datatable />
        <DatatableLand />
      </div>

      <div></div>
    </>
  );
};

export default MyPost;
