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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

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

  async function handleDelete(id: number) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  }

  async function handleUpdate(id: number) {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, price: Number(editPrice) }),
    });
    const data = await res.json();
    setProducts(products.map((p) => (p.id === id ? data : p)));
    setEditingId(null);
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
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
            onChange={(e) => setId(Number(e.target.value))}
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

      <ul style={{ marginTop: "2rem", listStyle: "none", padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "1rem" }}>
            {editingId === p.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                <button
                  onClick={() => handleUpdate(p.id)}
                  className="bg-green-500 text-white pl-5 pr-5"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white pl-5 pr-5"
                  style={{ marginLeft: "0.5rem" }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {p.name} - {p.price}$
                <button
                  onClick={() => {
                    setEditingId(p.id);
                    setEditName(p.name);
                    setEditPrice(p.price.toString());
                  }}
                  style={{ marginLeft: "1rem" }}
                  className="bg-green-500 text-white pl-5 pr-5"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{ marginLeft: "0.5rem" }}
                  className="bg-red-500 text-white pl-5 pr-5"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
