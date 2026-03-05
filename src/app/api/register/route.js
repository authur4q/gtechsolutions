import { connectDb } from "../../../../lib/mongoDb"
import User from "../../../../models/users"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"


export const POST = async (req) => {
   const { username, email, password } = await req.json();
   if(password.length < 8){
     return NextResponse.json({ error: "Password cannot be less than 8 characters" }, { status: 422 });
   }
    try {


        const hashedPassword = await bcrypt.hash(password,10)

        await connectDb()

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }





    
    const newUser = await User.create({
      username,
    
      email,
      
      password: hashedPassword,
    
    });

    return NextResponse.json({ message: "User registered", user: newUser }, { status: 201 });
    } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}


export const GET = async (req) => {
      const url = new URL(req.url)
    const username =  url.searchParams.get("name")
    
  try {
    await connectDb()
    const users = await User.find(username?{username}:{}).sort({createdAt:-1})
    return NextResponse.json(users)
  } catch (error) {
    console.log(error)
  }
}



