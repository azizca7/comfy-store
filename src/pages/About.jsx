"use client";
import React from "react";

function About() {
  return (
    <section className="min-h-screen py-20 px-4 md:px-10 bg-white dark:bg-black text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-purple-600 dark:text-purple-400">
          About Comfy Store
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Welcome to <span className="font-semibold">Comfy Store</span> – your
          ultimate destination for stylish, high-quality, and affordable
          comfort. Whether you're looking for cozy apparel, home accessories, or
          lifestyle products, we are here to provide you with items that combine
          functionality and design.
        </p>
        <p className="text-md md:text-lg mb-6">
          Founded with a passion for simplicity and comfort, Comfy Store
          believes in making everyday life better through thoughtfully designed
          products. We carefully select materials, work with trusted partners,
          and strive to deliver not only items but also a sense of ease and joy
          to your daily routine.
        </p>
        <p className="text-md md:text-lg">
          Thank you for supporting our journey. We hope you enjoy shopping with
          us as much as we enjoy bringing comfort to your life.
        </p>
      </div>
    </section>
  );
}

export default About;
