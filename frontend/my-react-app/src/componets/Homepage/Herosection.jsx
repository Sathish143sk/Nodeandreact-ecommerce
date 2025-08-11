import React from "react";
import { Carousel } from "react-bootstrap";

const HeroSection = () => {
  const banners = [
    {
      img: "/assets/sample.webp", // Replace with your actual banner image path
      alt: "Samsung Galaxy F36",
    },
    {
      img: "/assets/mic.webp",
      alt: "Offer Banner",
    },
    {
      img: "/assets/banner.webp",
      alt: "Electronics Sale",
    },
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <Carousel indicators={true} controls={true} interval={2000}>
        {banners.map((banner, index) => (
          <Carousel.Item key={index}>
            <img
              src={banner.img}
              alt={banner.alt}
              className="w-100"
              style={{
                borderRadius: "5px",
                height: "300px",
                objectFit: "cover",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
