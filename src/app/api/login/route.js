import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  let burl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
  try {
    const payload = await req.json()
    const response = await axios.post(`${burl}/auth/login`, payload)

    cookies().set("access_token", response.data.data.token.access_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    cookies().set("X-fnb", response.data.data.fnb_id, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    cookies().set("refresh_token", response.data.data.token.refresh_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    let userData = response.data.data
    delete userData.token
    cookies().set("current_user", userData, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return NextResponse.json(response?.data?.data, res);
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    return NextResponse.json({ message: errorMessage});
  }
}

