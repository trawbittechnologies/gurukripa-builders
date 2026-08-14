import { NextResponse } from 'next/server';
import { validateCredentials, AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!validateCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Authentication successful' });

    // Set secure HTTP-only cookie
    response.cookies.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
