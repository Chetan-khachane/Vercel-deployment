import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/app/models/userModel";
import { connect } from "@/app/dbconfig/dbconfig";
connect()

export async function GET(request:NextRequest) {
    try{
       const userId =  await getDataFromToken(request)
       const user = await User.findOne({_id : userId}).select("-password -isAdmin")
       return NextResponse.json({
        message : "User found",
        data : user
       })
    }catch(e:any){
        return NextResponse.json({
            error:e.message
        },{status:400})
    }
}
