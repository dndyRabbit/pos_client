import { NextResponse } from 'next/server';
import axios from 'axios';

export async function middleware(req) {
    const accessToken = req.cookies.get('access_token')?.value;
    const refreshToken = req.cookies.get('refresh_token')?.value;
    const { pathname } = req.nextUrl;

    // If user has both tokens and is on the login or home page, redirect to /dashboard
    if (accessToken && refreshToken && ['/login', '/'].includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // If missing either token and trying to access a protected route, redirect to login
    if ((!accessToken || !refreshToken) && !['/login', '/'].includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Refresh token if the access token is missing but the refresh token is present
    if (!accessToken && refreshToken) {
        try {
            const refreshResponse = await axios.post(`${req.nextUrl.origin}/api/refresh-token`, {
                refresh_token: refreshToken,
            });

            const { newAccessToken } = refreshResponse.data;

            // If token refresh succeeds, set the new token and continue
            const response = NextResponse.next();
            response.cookies.set('access_token', newAccessToken, { httpOnly: true, secure: true });
            return response;

        } catch (error) {
            console.error("Failed to refresh token:", error);
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next(); // Continue with the request
}

// Match routes to apply the middleware
export const config = {
    matcher: [
        '/dashboard', 
        '/login', 
        '/',

        '/material/ingredients',
        '/material/units',
        '/material/uoms',
    ], // Define protected routes here
};


