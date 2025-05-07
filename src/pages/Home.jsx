"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-10 bg-white dark:bg-black text-gray-800 dark:text-white">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-purple-600 dark:text-purple-400">
          Welcome to Comfy Store
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Discover your comfort zone. Find cozy clothing, home essentials, and
          lifestyle items made to keep you feeling great every day.
        </p>
        <Link href="/products">
          <Button>Shop Now</Button>
        </Link>
      </div>
    </section>
  );
}

export default Home;
