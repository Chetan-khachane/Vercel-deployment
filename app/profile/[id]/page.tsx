"use client"
import {use} from "react";
export default function UserProfile({ params }: { params: Promise<{ id: string }> }){
    const p = use(params)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p className="text-4xl">Profile Page{p.id}</p>
        </div>
    )
}