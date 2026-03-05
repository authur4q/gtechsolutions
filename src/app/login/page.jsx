"use client"
import { useState } from "react"
import styles from "./login.module.css"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  const router = useRouter()
      const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [error,setError] = useState("")
  const handleClick = async(e) =>{
    e.preventDefault()
    const res = await signIn("credentials",{
      email,
      password,
      redirect:false
    })

    console.log(res)

    if(res.ok){
      router.push("/")
    }
    else{
      setError("We are having trouble logging you in. Please check your credentials and try again.")
    }
  }

  return (
    <div>
        <div className={styles.login}>
      <div className={styles.container1}>

        <div className={styles.epp}>
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password"  onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
          
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.signup}>
            <button onClick={handleClick}>
                Login
            </button>
            <h2>Or</h2>
            <Link href = {"/register"}>
              <button>
                  Don't have an account?Sign Up
              </button>
            </Link>
        </div>
      </div>
      <div className={styles.container2}>
        <h1>Get Best of the Best products right here on GtechSolutions</h1>
      </div>
    </div>
    </div>
  )
}

export default page
