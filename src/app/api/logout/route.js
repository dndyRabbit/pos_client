import { clearStorage } from "@/utils/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        cookies().delete("access_token");
        cookies().delete("X-companies");
        cookies().delete("refresh_token");
        cookies().delete("current_user");
        
       return NextResponse.json({message: "OK"});
    } catch (error) {
        console.log(error)
        const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
        return NextResponse.json(
            { message: errorMessage },
            { status: error.response?.status || 500 } // Use the error status or default to 500
        );
    }
}
