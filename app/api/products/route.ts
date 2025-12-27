import { products } from "@/app/data/route";

export async function GET(request: Request) {
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, name, price } = body;

  const newProduct = { id: id, name: name, price: price };

  products.push(newProduct);
  return new Response(JSON.stringify(newProduct), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
console.log(products);
