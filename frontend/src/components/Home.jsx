// Home.jsx
import React from 'react';
import Carousel from '../pages/Products/Carousel';
import Showcase from '../pages/Products/Showcase';

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-medium my-8">Trending Products</h1>
      {/* Agregar el componente de carrusel */}
      <Carousel />
      {/* Puedes agregar otros componentes debajo */}
      <h1 className="text-center text-4xl font-medium my-8">Other Products</h1>
      <Showcase/>
    </div>
  );
};

export default Home;
