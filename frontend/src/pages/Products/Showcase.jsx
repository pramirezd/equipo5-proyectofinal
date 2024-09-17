import React from "react";
import Products from "./Products";

const Showcase = () => {
  return (
    <div className="flex justify-center p-11">
      <Products limite={10} />
    </div>
  );
};

export default Showcase;
