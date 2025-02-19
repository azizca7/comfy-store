import React, { useContext } from "react";
import { CartContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  function handleRemove(product) {
    let copied = [...cart];
    copied = copied.filter((item) => {
      return item.id != product.id;
    });
    toast.success("Item removed from cart", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setCart(copied);
  }
  function handleChange(current, product) {
    let copied = [...cart];
    copied.map((item) => {
      if (item.id == product.id) {
        item.count = current;
      }
      return item;
    });
    setCart(copied);
  }

  function calcTotal() {
    return cart.reduce((total, item) => {
      return total + item.product.attributes.price * item.count;
    }, 0);
  }

  return (
    <div className="container mx-auto px-40 mt-20">
      <div>
        <h3 className="text-5xl mt-10 text-center text-gray-700 shadow-xs">
          {cart.length > 0 ? "Shopping Cart" : "Your cart is empty"}
        </h3>
      </div>
      {cart.length > 0 &&
        cart.map(function (item, index) {
          return (
            <div key={index} className="w-full p-3 rounded-md mt-10 flex ">
              <img
                src={item?.product?.attributes.image}
                className="w-[200px] h-[200px] rounded-md mr-20"
              />
              <div className="flex justify-between">
                <div className="flex items-start mr-25">
                  <div className="mt-5">
                    <h3 className="text-xl font-medium mb-2">
                      {item?.product?.attributes?.title}
                    </h3>
                    <h3 className="text-lg font-medium opacity-[0.5]">
                      {item?.product?.attributes?.company}
                    </h3>
                    <h3 className="flex items-center mt-3 text-lg">
                      Color:{" "}
                      <span
                        style={{ background: item.color }}
                        className="inline-block rounded-full w-5 h-5 ml-2"
                      ></span>
                    </h3>
                  </div>

                  <span
                    style={{ background: item.color }}
                    className="inline-block rounded-full"
                  ></span>
                  <br />
                  <div className="mt-5 ml-25 mr-70">
                    <p className="text-lg">Amount</p>
                    <select
                      onChange={(e) => {
                        handleChange(e.target.value, item);
                      }}
                      className="w-[100px] border mt-3 rounded-md "
                      value={item?.count}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                    <br />
                    <button
                      onClick={() => {
                        handleRemove(item);
                      }}
                      className="bg-red-500 px-2 py-1 mt-5 rounded-md text-white cursor-pointer"
                    >
                      remove
                    </button>
                  </div>
                  <h3 className="mt-10 text-xl">
                    <b>Price: $ {calcTotal()}</b>
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      <ToastContainer />
    </div>
  );
}

export default Cart;
