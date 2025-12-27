"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newId, setId] = useState(0);
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newId,
        name: newName,
        price: Number(newPrice),
      }),
    });
    const data = await res.json();
    setProducts([...products, data]);
    setNewName("");
    setNewPrice("");
    setShowForm(false);
    setId(0);
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1 className="font-bold">Products</h1>
      <button
        className="bg-yellow-50 text-black pl-5 pr-5"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Create"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <input
            type="number"
            placeholder="id"
            value={newId}
            onChange={(e) => setId(e.target.value)}
            required
            style={{ marginRight: "0.5rem" }}
          />
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            style={{ marginRight: "0.5rem" }}
          />
          <input
            type="number"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
            style={{ marginRight: "0.5rem" }}
          />
          <button type="submit">Add Product</button>
        </form>
      )}

      <ul style={{ marginTop: "2rem" }}>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}$
          </li>
        ))}
      </ul>
    </div>
  );
}
