"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp(){
    const router = useRouter()
    const [buttonDisabled,setButtonDisabled] = useState(false)
    const [user,setUser] = useState({
        email : "",
        password : "",
        username : ""
    })
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        if(user.email.length > 0)   setButtonDisabled(false)
        else setButtonDisabled(true)
    },[user])
    const onSignup = async () =>{
        try{
            setLoading(true)
            const response = await axios.post("/api/users/signup",user)
            console.log("Signup Success",response.data)
            router.push("/login")
        }catch(error : any){
            console.log(error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing"  : "Signup"}</h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input id="username" type="text" className="p-2 border border-gray-300 rounded-lg
            mb-4 focus:outline-none focus:border-gray-600
            "
            value={user.username}
            onChange={(e)=>setUser({...user,username : e.target.value})}
            placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input id="email" type="email" className="p-2 border border-gray-300 rounded-lg
            mb-4 focus:outline-none focus:border-gray-600
            "
            value={user.email}
            onChange={(e)=>setUser({...user,email : e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input id="password" type="password" className="p-2 border border-gray-300 rounded-lg
            mb-4 focus:outline-none focus:border-gray-600
            "
            value={user.password}
            onChange={(e)=>setUser({...user,password : e.target.value})}
            placeholder="password"
            />
            <button onClick={onSignup}
            disabled={buttonDisabled}
                className="p-2 border border-gray-300 rounded-lg mb-4 
                focus:outline-none focus:border-gray-600
                "
            >Signup</button>
            <Link href="/login">Visit Login page</Link>
        </div>
    )
}