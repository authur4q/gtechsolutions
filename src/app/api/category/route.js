import { NextResponse } from 'next/server';
import { connectDb } from '../../../../lib/mongoDb';
import Product from '../../../../models/product';


export async function GET(req) {
    const url = new URL(req.url);
  const { searchParams } = url;
  const category = searchParams.get('category');
  
  try {
    await connectDb()
    const products = await Product.find( { category: category }).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_GET] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}