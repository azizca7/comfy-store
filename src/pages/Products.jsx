import React, { useEffect, useState } from "react";
import { http } from "../axios";
import Card from "../components/Card";
import view from "../assets/view.png";
import icon from "../assets/icon.png";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { RotatingLines } from "react-loader-spinner";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchParms, setSearchParams] = useSearchParams();
  const [currentpage, setCurrentpage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);
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
      searchParms.get("search") ||
      searchParms.get("category") ||
      searchParms.get("company") ||
      searchParms.get("order") ||
      searchParms.get("price") ||
      searchParms.get("shipping")
    ) {
      setFilter((prev) => {
        return {
          search: searchParms.get("search") ? searchParms.get("search") : "",
          company: searchParms.get("company") ? searchParms.get("company") : "all",
          order: searchParms.get("order") ? searchParms.get("order") : "a-z",
          price: searchParms.get("price") ? parseInt(searchParms.get("price")) : 100000,
          shipping: searchParms.get("shipping") ? true : false,
          category: searchParms.get("category") ? searchParms.get("category") : "all",
        };
      });
      url = `/products?search=${filter.search}&category=${
        filter.category
      }&company=${filter.company}&order=${filter.order}&price=${
        filter.price
      }&shipping=${filter.shipping ? "on" : ""}`;
    }

    if (searchParms.get("page")) {
      setCurrentpage(searchParms.get("page"));
    }

    http
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setProducts(response?.data?.data);
          setTotalPage(response?.data?.meta?.Pagination?.pageCount);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    http
      .get(`/products?page=${currentpage}`)
      .then((response) => {
        if (response.status == 200) {
          setProducts(response?.data?.data);
          setTotalPage(response?.data?.meta?.Pagination?.pageCount);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [currentpage]);

function handleFilter(e) {
  e.preventDefault();
  setSearchParams({
    search: filter.search,
    category: filter.category,
    company: filter.company,
    order: filter.order,
    price: filter.price,
    shipping: filter.shipping ? "on" : "",
  });

  let url = `/products?search=${filter.search}&category=${
    filter.category
  }&company=${filter.company}&order=${filter.order}&price=${
    filter.price
  }&shipping=${filter.shipping ? "on" : ""}`;

  http
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        setProducts(response?.data?.data);
        setTotalPage(response?.data?.meta?.pageCount);
      }
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
}


  function handleIcon() {
    setViewMode("grid");
  }

  function handleview() {
    setViewMode("list");
  }
  function handlepaginate(event, target) {
    setCurrentpage(target);
    setSearchParams({ page: target });
  }

  return (
    <div className="container mx-auto px-40">
      <form className="grid grid-cols-4 gap-4 mt-10 bg-blue-100 p-5 pb-5 rounded-lg">
        <div className="flex flex-col gap-2">
          <label>Search Product</label>
          <input
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className="border rounded-md p-2 bg-white"
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Select Category</label>
          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="border rounded-md p-2 bg-white"
            type="text"
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
            onChange={(e) => setFilter({ ...filter, company: e.target.value })}
            className="border rounded-md p-2 bg-white"
            type="text"
          >
            <option>all</option>
            <option>Modenza</option>
            <option>Luxora</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>Sort by</label>
          <select
            value={filter.order}
            onChange={(e) => setFilter({ ...filter, order: e.target.value })}
            className="border rounded-md p-2 bg-white"
            type="text"
          >
            <option>a-z</option>
            <option>z-a</option>
            <option>all</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>
            Select price: <b>${filter.price}</b>
          </label>
          <input
            value={filter.price}
            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            className="border rounded-md p-2 bg-white"
            type="range"
            min={1000}
            max={100000}
          />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <label>Free shipping</label>
          <input
            onChange={(e) =>
              setFilter({ ...filter, shipping: e.target.checked })
            }
            className="border cursor-pointer rounded-md p-2 bg-white"
            type="checkbox"
          />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <button
            onClick={handleFilter}
            className="bg-blue-500 w-full p-1 cursor-pointer rounded-lg text-white"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <button
            type="reset"
            onClick={() =>
              setFilter({ search: "", price: 10000, shipping: false })
            }
            className="bg-purple-500 w-full p-1 cursor-pointer rounded-lg text-white"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="my-5 bg-[#fafaff] rounded-md p-5 ">
        <div className="flex justify-between items-center">
          <p>
            <b>{products.length} products</b>
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleIcon}
              className={`p-2 rounded-lg cursor-pointer ${
                viewMode == "grid" ? "bg-blue-200" : "bg-white"
              }`}
            >
              <img className="w-5 h-5" src={view} />
            </button>
            <button
              type="button"
              onClick={handleview}
              className={`p-2 rounded-lg cursor-pointer ${
                viewMode == "list" ? "bg-blue-200" : "bg-white"
              }`}
            >
              <img className="w-5 h-5" src={icon} />
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      <div
        className={`${
          viewMode == "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-10"
            : "flex flex-col gap-4 mt-10"
        }`}
      >
        {!loading &&
          Array.isArray(products) &&
          products.length > 0 &&
          products.map((product, index) => (
            <Card key={index} product={product} viewMode={viewMode} />
          ))}
        {!loading && products.length == 0 && (
          <p>Sorry, no products matched your search...</p>
        )}
      </div>

      <div className="flex justify-end my-10">
        <Pagination
          count={3}
          variant="outlined"
          page={currentpage}
          onChange={handlepaginate}
          color="primary"
        />
      </div>
    </div>
  );
}

export default Products;
