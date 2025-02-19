import { useNavigate } from "react-router-dom";

function Card({ product, viewMode }) {
  const navigate = useNavigate();

  function handle() {
    navigate(`/products/${product.id}`);
  }

  return (
    <div
      onClick={handle}
      className={`${
        viewMode == "grid"
          ? "w-full shadow-md rounded-lg p-4 pb-5 text-center cursor-pointer hover:shadow-xl"
          : "flex items-center shadow-md rounded-lg p-4 pb-5 cursor-pointer hover:shadow-xl mb-4"
      }`}
    >
      <img
        className={`${
          viewMode == "grid"
            ? "w-full rounded-lg h-auto aspect-video object-cover"
            : "w-55 h-50 rounded-lg object-cover mr-6"
        }`}
        src={product?.attributes?.image}
      />
      <div className="">
        <h2 className="text-xl mt-2">{product?.attributes?.title}</h2>
        <p className="text-xl mt-2">
          <b>$ {product?.attributes?.price}</b>
        </p>
      </div>
    </div>
  );
}

export default Card;
