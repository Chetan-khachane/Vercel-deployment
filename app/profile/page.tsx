"use client"
import axios from "axios"
import {toast} from "react-hot-toast"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect,useState } from "react"
export default function ProfilePage(){
        const router = useRouter()
        const [data,setData] = useState("nothing")
    const logout = async () =>{
        try{
            await axios.get("/api/users/logout")
            console.log("successful")
            toast.success("Logout successful")
            router.push("/login")
        }catch(e:any){
            console.error(e.message)
            toast.error(e.message)
        }
    }
    const getUserDetails = async ()=>{
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id)
    }
    const startFetchingDetails = () =>{
        getUserDetails()
    }
    useEffect(startFetchingDetails,[])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <hr/>
            <h2>{data === "nothing" ? "Nothing" : <Link 
            href={`/profile/${data}`}
            >{data}</Link>}</h2>
            <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700
            text-white font-bold py-2 px-4 rounded
            "
            >Logout</button>
        </div>
    )
}