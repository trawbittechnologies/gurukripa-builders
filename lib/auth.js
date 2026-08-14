import { cookies } from 'next/headers';
import { Pool } from 'pg';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gurukripa@2026';
const TOKEN_VALUE = process.env.ADMIN_SECRET || 'gurukripa_luxury_super_secret_jwt_2026_key';
const DATABASE_URL = process.env.DATABASE_URL;

let pool = null;

function getPool() {
  if (!pool && DATABASE_URL) {
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === TOKEN_VALUE;
}

export async function validateCredentials(username, password) {
  const p = getPool();

  if (p) {
    try {
      const res = await p.query(
        'SELECT * FROM admins WHERE username = $1 LIMIT 1',
        [username]
      );
      if (res.rows.length > 0) {
        const adminUser = res.rows[0];
        return adminUser.password === password;
      }
    } catch (err) {
      console.error('Error validating admin credentials against PostgreSQL:', err);
    }
  }

  // Fallback to environment variables
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export const AUTH_COOKIE_NAME = 'admin_token';
export const AUTH_COOKIE_VALUE = TOKEN_VALUE;
