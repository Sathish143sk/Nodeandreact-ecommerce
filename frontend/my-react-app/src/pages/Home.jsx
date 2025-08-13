import React from "react";
import "./Home.css";
import HomreNavbar from "../componets/Homepage/HomeNavbar";
import Herosection from "../componets/Homepage/Herosection";
import Categroysection from "../componets/Homepage/HomeCategory";
import HomeProducts from "../componets/Homepage/HomeProducts";
import LatopProducts from "../componets/Homepage/LaptopProducts";
import SpeakerProduct from "../componets/Homepage/speakerProduct";
const Home = () => {
  return (
    <div className="full-page-condent">
      <div id="page-navbar">
        <HomreNavbar />
      </div>

      <div className="page-content">
        <div>
          <Herosection />
        </div>
        <div>
          <Categroysection />
        </div>
        <div>
          <HomeProducts />
        </div>
        <div>
          <LatopProducts />
        </div>
        <div>
          <SpeakerProduct />
        </div>
      </div>
    </div>
  );
};

export default Home;
