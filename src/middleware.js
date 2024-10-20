import { NextResponse } from 'next/server';
import axios from 'axios';
import { setCurrentUser, setMenus } from './utils/cookies';

export async function middleware(req) {
    const access_token = req.cookies.get('access_token');
    const refresh_token = req.cookies.get('refresh_token'); // Assuming refresh token is stored in cookies
    const { pathname } = req.nextUrl;

    // If no access token and trying to access a protected route, try to refresh
    if (access_token && refresh_token) {
        try {
            const url = req.nextUrl.clone()
            url.pathname = '/api/refresh-token'

            await axios.post(url, {refresh_token: refresh_token.value})

            return NextResponse.next(); // Continue with the request if everything is fine
        } catch (error) {
            console.error("Failed to refresh token:", error);
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // If there's no refresh token or both tokens are invalid, redirect to login
    if ((!access_token || !refresh_token) && !['/login', '/'].includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If access token exists but trying to access the login page, redirect to home
    if (access_token && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // If access token exists but trying to access the login page, redirect to home
    if (access_token && refresh_token && ['/login', '/'].includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next(); // Continue with the request if everything is fine
}

// Match routes to apply the middleware
export const config = {
    matcher: ['/dashboard'], // Add your protected routes here
};
