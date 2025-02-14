import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const navigate = useNavigate();
  function handleRedirect() {
    navigate(`/products/${product.id}`);
  }
  return (
    <div
      onClick={handleRedirect}
      className="w-[30%] shadow-md rounded-lg p-4 pb-5 text-center cursor-pointer hover:shadow-xl"
    >
      <img
        className="w-full rounded-lg h-[200px] object-cover"
        src={product?.attributes?.image}
        alt=""
      />
      <h4 className="text-xl mt-2">{product?.attributes?.title}</h4>
      <p className="text-xl mt-2">{product?.attributes?.price}</p>
    </div>
  );
}

export default Card;
