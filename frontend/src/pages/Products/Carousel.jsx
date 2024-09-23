import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper";
import CarouselProductCard from "./CarouselProductCard";
import { getProducts } from "./Products";
import { useEffect, useState } from "react";

SwiperCore.use([Autoplay]);

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Carousel = () => {
  const [shuffledProducts, setShuffledProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setShuffledProducts(shuffleArray(products));
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={900}
    >
      {shuffledProducts.map((product) => (
        <SwiperSlide key={product.id}>
          <CarouselProductCard
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.img_url}
            brand={product.brand}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
