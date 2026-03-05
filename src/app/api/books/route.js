import { NextResponse } from 'next/server';
import { connectDb } from '../../../../lib/mongoDb';
import Product from '../../../../models/product';

export async function POST(req) {

  try {

    await connectDb();
    


    const body = await req.json();
    const { name, price, description,category, condition, stockLevel, imageUrl } = body;

    if (!name || !price || !imageUrl || imageUrl.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    
    const product = await Product.create({
      name,
      price: parseFloat(price),
      description,
      condition,
      category,
      stockLevel: Number(stockLevel),
      imageUrl,
    });

    console.log("Product saved successfully:", product._id);

    return NextResponse.json({ 
      message: "Product created successfully", 
      product 
    }, { status: 201 });

  } catch (error) {
    console.error("[PRODUCT_POST] Error:", error);
    
   
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {

  try {
    await connectDb();
    const products = await Product.find().sort({ createdAt: 1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_GET] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}