import React, { useEffect, useState } from "react";
import { http } from "../axios";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    http
      .get("/products?limit=3")
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="my-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Comfy Store</h1>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Find the best furniture that brings comfort and style to your home.
        </p>
      </section>

      <section className="my-4 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="border rounded-lg shadow-md p-4 flex flex-col justify-between"
              >
                <Card product={product} viewMode="grid" />
                <div className="mt-4 text-center"></div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center">
          <Link to={`/products`}>
            <button className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
              View details
            </button>
          </Link>
        </div>
      </section>

    
    </main>
  );
}

export default Home;
