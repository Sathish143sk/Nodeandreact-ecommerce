import React from "react";
import { Carousel, Card } from "react-bootstrap";

const categories = [
  {
    name: "Motorola G85 5G",
    price: "from 14999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Motorola G45 5G",
    price: "From 10999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Vivo T4 5G",
    price: "from 20499*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Realme P3 5G",
    price: "From 14999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Oppo K13 5G",
    price: "from 16499*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "POCO F7 5G",
    price: "from 29999*",
    image: "https://via.placeholder.com/150x200",
  },{
    name: "Realme P3 5G",
    price: "From 14999*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "Oppo K13 5G",
    price: "from 16499*",
    image: "https://via.placeholder.com/150x200",
  },
  {
    name: "POCO F7 5G",
    price: "from 29999*",
    image: "https://via.placeholder.com/150x200",
  },
];

const CategorySection = () => {
  // Group categories into slides of 3 per carousel item
  const chunkArray = (arr, size) => {
    return arr.reduce((chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
      chunks[chunkIndex].push(item);
      return chunks;
    }, []);
  };

  const categoryChunks = chunkArray(categories, 8);

  return (
    <div className="my-4">
      <h4 className="mb-3 px-2">Best Deals on All Category</h4>
      <Carousel indicators={false} controls={true} interval={null}>
        {categoryChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center gap-4">
              {chunk.map((cat, i) => (
                <Card
                  key={i}
                  className="text-center border-1"
                  style={{ width: "250px" }}
                >
                  <Card.Img
                    variant="top"
                    src={cat.image}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title style={{ fontSize: "14px" }}>
                      {cat.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "13px", color: "red" }}>
                      {cat.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CategorySection;
