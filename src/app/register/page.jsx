"use client"
import React, { useState } from 'react'
import styles from "./register.module.css"
import { useRouter } from 'next/navigation'
import Link from 'next/link'



const Register = () => {
const [error,setError] = useState("")
const [username,setUsername] = useState("")

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")





const router = useRouter()



const handleSubmit = async () => {
    if(password.length< 8){
  setError("Password cannot be less than  characters")
  
  setPassword("")
}

  const res = await fetch("/api/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      username,
      email,
      password

    })
  })
  if(res.ok){
    router.push("/login")
  }
  else{
    setError("Email already taken,Try another one")
  }
  if(res.status == 422){
    setError("Password cannot be less than 8 characters")
  }

}

  return (
    <div className={styles.register}>
      <div className={styles.container1}>

        <div className={styles.epp}>
             <input  onChange={e => setUsername(e.target.value)}  value={username} type="text" placeholder='Username'  required/>
            
            <input onChange={e => setEmail(e.target.value)} name='email' value={email} type="email" placeholder='Email'  required/>
            <input onChange={e => setPassword(e.target.value)} name='password' value={password} type="password" placeholder='Password' required />
            
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.signup}>
            <button onClick={handleSubmit} >
                Sign Up
            </button>
            <h2>Or</h2>

            <Link href="/login">
            <button>
             Already have an account? Login
            </button>
            </Link>
        </div>
      </div>
      <div className={styles.container2}>
        <h1>Get Best of the Best products right here on GtechSolutions</h1>
      </div>
    </div>
  )
}

export default Register
