import { connectDb } from "../../../../../lib/mongoDb"
import Product from "../../../../../models/product"
import { NextResponse } from "next/server"


export const GET = async (req, { params }) => {
   
    const  {id} = await params
    
    if (!id) {
        return new NextResponse("Product ID is required", { status: 400 });
    }

    try {
        await connectDb()
        
        
        const product = await Product.findById(id)
        console.log(`Fetched product with ID ${id}:`, product);
        
        if (!id) {
            console.log(`Product with ID ${id} not found`);
            return new NextResponse("Product not found", { status: 404 });
        }
        
      
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
       
        console.error("Error fetching product by ID:", error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
