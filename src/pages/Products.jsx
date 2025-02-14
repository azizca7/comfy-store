import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { http } from "../axios";
import { Audio } from "react-loader-spinner";
import Card from "../components/Card";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    search: "",
    company: "all",
    category: "all",
    order: "a-z",
    price: 10000,
    shipping: false,
  });

  useEffect(() => {
    setLoading(true);
    let url = "/products";

    if (
      searchParams.get("search") ||
      searchParams.get("category") ||
      searchParams.get("company") ||
      searchParams.get("order") ||
      searchParams.get("price") ||
      searchParams.get("shipping")
    ) {
      setFilter((prev) => {
        return {
          search: searchParams.get("search") ? searchParams.get("search") : "",
          company: searchParams.get("company")
            ? searchParams.get("company")
            : "all",
          category: searchParams.get("category")
            ? searchParams.get("category")
            : "all",
          order: searchParams.get("order") ? searchParams.get("order") : "a-z",
          price: searchParams.get("price") ? searchParams.get("price") : 100000,
          shipping: searchParams.get("shipping") ? true : false,
        };
      });

      url = `/products?search=${filter.search}&category=${
        filter.category
      }&company=${filter.company}&order${filter.order}&price${
        filter.price
      }&shipping=${filter.shipping && "on"}`;
    }
    http
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setProducts(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);
  function handleFilter(e) {
    e.preventDefault();
    let url = `/products?search=${filter.search}&category=${
      filter.category
    }&company=${filter.company}&order${filter.order}&price${
      filter.price
    }&shipping=${filter.shipping && "on"}`;

    setSearchParams(
      { ...filter, shipping: filter.shipping ? "on" : "" },
      false
    );
    http
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setProducts(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function resetFilter() {
    setSearchParams({});

    setFilter({
      search: "",
      company: "all",
      category: "all",
      order: "a-z",
      price: 10000,
      shipping: false,
    });
  }

  return (
    <div>
      <form className="grid grid-cols-4 gap-4 mt-10 bg-blue-100 p-5 rounded-lg">
        <div className="flex flex-col gap-2">
          <label>Search Product</label>
          <input
            value={filter.search}
            onChange={(e) => {
              setFilter({ ...filter, search: e.target.value });
            }}
            className="bg-white border rounded-md p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Select category</label>

          <select
            value={filter.category}
            onChange={(e) => {
              setFilter({ ...filter, category: e.target.value });
            }}
            className="bg-white border rounded-md p-2"
          >
            <option>all</option>
            <option>Tables</option>
            <option>Chairs</option>
            <option>Kids</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Select Company</label>

          <select
            value={filter.company}
            onChange={(e) => {
              setFilter({ ...filter, company: e.target.value });
            }}
            className="bg-white border rounded-md p-2"
          >
            <option>all</option>
            <option>Modenza</option>
            <option>Luxora</option>
            <option>Comfora</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Sort by</label>

          <select
            value={filter.order}
            onChange={(e) => {
              setFilter({ ...filter, order: e.target.value });
            }}
            className="bg-white border rounded-md p-2"
          >
            <option>a-z</option>
            <option>z-a</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Select price</label>
          <input
            value={filter.price}
            onChange={(e) => {
              setFilter({ ...filter, price: Number(e.target.value) });
            }}
            className="bg-white border rounded-md p-2"
            type="range"
            min={1}
            max={10000}
          />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <label>Free shipping</label>
          <input
            onChange={(e) => {
              setFilter({ ...filter, shipping: e.target.checked });
            }}
            className="bg-white border rounded-md p-2"
            type="checkbox"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleFilter}
            className="bg-blue-500 w-full p-2 rounded-lg cursor-pointer text-white"
          >
            SEARCH
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="reset"
            onClick={resetFilter}
            className="bg-purple-500 w-full p-2 rounded-lg cursor-pointer text-white"
          >
            RESET
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-between gap-y-7 mt-10">
        {loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        )}
        {!loading &&
          products.length > 0 &&
          products.map(function (product, index) {
            return <Card key={index} product={product} />;
          })}
        {!loading && products.length == 0 && (
          <p>Sorry, no products matched your search...</p>
        )}
      </div>
    </div>
  );
}

export default Products;
