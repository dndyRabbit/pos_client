import { setCurrentUser, setMenus } from "@/utils/cookies";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const REFRESH_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`; // Replace with your actual refresh token API
  try {
    const payload = await req.json()
    const response = await axios.post(`${REFRESH_API_URL}`, payload)

    // const data = response.data.data

    // cookies().set("access_token", data.token.access_token, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    // });
    // cookies().set("X-companies", data.company_id, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    // });

    return NextResponse.json(response?.data);
  } catch (error) {
    console.log(error)
    const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
    return NextResponse.json(
        { message: errorMessage },
        { status: error.response?.status || 500 } // Use the error status or default to 500
    );
  }
}

