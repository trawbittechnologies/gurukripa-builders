import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gurukripa@2026';
const TOKEN_VALUE = 'gurukripa_admin_authenticated_session_token_2026';

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === TOKEN_VALUE;
}

export function validateCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export const AUTH_COOKIE_NAME = 'admin_token';
export const AUTH_COOKIE_VALUE = TOKEN_VALUE;
