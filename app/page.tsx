"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("api/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </>
  );
}
