import Carousel from "../../components/carousel/carousel";
import Featured from "../../components/Featured/Featured";
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties";
import Footer from "../../components/Footer/Footer";
// import { posts } from "../../data";
// import Card from "../../components/card";
import Header from "../../components/Header/Header";
import HomeImage from "../../components/HomeImage/HomeImage";
import MailList from "../../components/MailList/MailList";
import Navbar from "../../components/Navbar";
import PropertyList from "../../components/PropertyList/PropertyList";
import "./home.scss";


const Home = ({ user }) => {
  return (
    <>
      <Navbar data={user} />
      <Header data={user} />
      <Carousel />
      <div className="homeContainer">
        <HomeImage />
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1>Buy a Commercial property</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Home;
