import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper";
import CarouselProductCard from "./CarouselProductCard";
import { useAuth } from "../../context/userContext";
import { toast } from "react-toastify";

SwiperCore.use([Autoplay]);

// Function to shuffle an array
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/easycommerce/products"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(shuffleArray(data));
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      toast.success("Producto añadido correctamente");
    } catch (error) {
      toast.error("Error al agregegar el producto al carrito");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <CarouselProductCard
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.img_url}
            seller={product.brand}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
