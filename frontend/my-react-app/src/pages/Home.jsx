import React from "react";
import "./Home.css";
import HomreNavbar from "../componets/Homepage/HomeNavbar";
import Herosection from "../componets/Homepage/Herosection";
import Categroysection from "../componets/Homepage/HomeCategory";
import HomeProducts from "../componets/Homepage/HomeProducts";
import LatopProducts from "../componets/Homepage/LaptopProducts";
import SpeakerProduct from "../componets/Homepage/speakerProduct";
import Footer from "../componets/Homepage/HomeFooter";
import ProductSection from "../componets/Homepages/ProductSection";
const Home = () => {
  const topSelection = [
    {
      image: "https://via.placeholder.com/150",
      name: "Food Spreads",
      offer: "Explore Now",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Men's Trousers",
      offer: "Special Offer",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "PC Gaming",
      offer: "Best Deals",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Smart Watches",
      offer: "Top Picks",
    },
  ];

  const discounts = [
    {
      image: "https://via.placeholder.com/150",
      name: "Rain Coat",
      offer: "Min. 50% Off",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Headlights",
      offer: "Min. 40% Off",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Ethnic Wear",
      offer: "Special Price",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Laptop Stands",
      offer: "Up to 30% Off",
    },
  ];

  const topRated = [
    {
      image: "https://via.placeholder.com/150",
      name: "PS5",
      offer: "Best Picks",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Gaming Controller",
      offer: "Hand-picked",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "School Bags",
      offer: "Top Rated",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Smart Watch",
      offer: "Popular Choice",
    },
  ];

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
        <div>
          <ProductSection title="Top Selection" products={topSelection} />
          <ProductSection title="Discounts for you" products={discounts} />
          <ProductSection title="Top Rated" products={topRated} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
