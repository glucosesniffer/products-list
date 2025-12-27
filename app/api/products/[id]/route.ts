import { NextResponse } from "next/server";
import { products } from "@/app/data/route";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = products.findIndex((p) => Number(p.id) === Number(id));
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const deleted = products.splice(index, 1)[0];
  return NextResponse.json({ success: true, deleted });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const index = products.findIndex((p) => Number(p.id) === Number(id));

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  products[index] = { ...products[index], name: body.name, price: body.price };
  return NextResponse.json(products[index]);
}
