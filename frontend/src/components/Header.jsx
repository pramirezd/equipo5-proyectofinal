import React from "react";

const Header = () => {
  return (
    <div className="bg-black p-2 text-center rounded-b-sm">
      <p className=" text-white font-medium">
        Take advantage! We have a 20%{" "}
        <span className="text-[#c2ff05] font-bold">discount</span> on selected
        products
      </p>
    </div>
  );
};

export default Header;
