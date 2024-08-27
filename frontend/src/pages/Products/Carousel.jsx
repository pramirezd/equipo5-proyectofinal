import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper";
import CarouselProductCard from "./CarouselProductCard";
import productos from "../../data.js";

SwiperCore.use([Autoplay]);

//Mezclar los productos, para que sean al azar GRACIAS GPT
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
  const shuffledProducts = shuffleArray([...productos]);
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
            name={product.nombre}
            description={product.description}
            price={product.price}
            image={product.img}
            seller={product.brand}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
