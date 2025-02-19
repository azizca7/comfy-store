import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { http } from "../axios";
import { CartContext } from "../App";
import { ToastContainer, toast } from "react-toastify";

function Details() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const [selectedcolor, setSelectedColor] = useState("");
  const [count, setCount] = useState(1);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    http
      .get(`/products/${params.id}`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setSelectedColor(product?.attributes?.colors?.[0] || "");
  }, [product]);

  function handleAdd() {
    let isExist = cart.find((value) => {
      return value.product.id == product.id && value.color == selectedcolor;
    });
    let cartObject = {
      id: Date.now(),
      count: count,
      color: selectedcolor,
      product: product,
    };
    let copied = [...cart];
    if (isExist) {
      copied = copied.map(function (value) {
        if (value.product.id == product.id && value.color == selectedcolor) {
          value.count = Number(value.count);
          value.count += Number(count);
        }
        return value;
      });
      setCart(copied);
    } else {
      let copy = [...cart];
      copy.push(cartObject);
      setCart(copy);
    }

    toast.success("Item added to cart", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="container mx-auto px-40 flex gap-13 mt-20 ">
      <img
        className="w-full rounded-md h-[400px] object-cover"
        src={product?.attributes?.image}
      />
      <div>
        <h3 className="text-5xl mb-4 font-bold">
          {product?.attributes?.title}
        </h3>
        <h3 className="text-3xl mb-3 opacity-[0.5]">
          {product?.attributes?.company}
        </h3>
        <h3 className="text-2xl mb-5">$ {product?.attributes?.price}</h3>
        <h3 className="text-[17px] font-normal leading-9">
          {product?.attributes?.description}
        </h3>

        <div className="flex gap-3 mt-5">
          {product?.attributes?.colors?.length > 0 &&
            product.attributes.colors.map(function (color, index) {
              return (
                <span
                  onClick={() => setSelectedColor(color)}
                  style={{
                    background: color,
                    border: color == selectedcolor ? "2px solid black" : "none",
                  }}
                  key={index}
                  className=" inline-block items-center w-[30px] h-[30px] cursor-pointer rounded-full "
                ></span>
              );
            })}
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <label htmlFor="count">
            <select
              className="border p-2 w-[400px] rounded-md"
              value={count}
              onChange={(e) => {
                setCount(e.target.value);
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </label>
        </div>
        <button
          onClick={handleAdd}
          className="mt-10 py-4 px-7 bg-purple-700 cursor-pointer rounded-md mb-20 text-white"
        >
          ADD TO BAG
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Details;
