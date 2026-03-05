import { NextResponse } from 'next/server';
import { connectDb } from '../../../../lib/mongoDb';
import Product from '../../../../models/product';

export async function GET(request) {
  try {
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');


    if (!query || query.trim() === "") {
      return NextResponse.json([]);
    }

    
    await connectDb();


    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).lean();


    const sortedResults = results.sort((a, b) => {
      const q = query.toLowerCase();
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();


      const aStarts = aName.startsWith(q);
      const bStarts = bName.startsWith(q);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      
      return aName.localeCompare(bName);
    });

    
    return NextResponse.json(sortedResults.slice(0, 15));

  } catch (error) {
    console.error("Database Search Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}