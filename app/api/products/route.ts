import { products } from "../../data/route";

export async function GET(request: Request) {
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

console.log(products);
