import AxiosAPI from "@/services/Axios";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  let burl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
  try {
    const payload = await req.json() 
    const response = await AxiosAPI.post(`auth/login`, payload)

    cookies().set("access_token", response.data.data.token.access_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    cookies().set("X-companies", response.data.data.company_id, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    cookies().set("refresh_token", response.data.data.token.refresh_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    // let userData = response.data.data
    // delete userData.token
    // cookies().set("current_user", userData, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    // });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error)
    const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
    return NextResponse.json(
        { message: errorMessage },
        { status: error.response?.status || 500 } // Use the error status or default to 500
    );
  }
}

