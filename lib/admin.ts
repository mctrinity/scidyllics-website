import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'isAdminSigned';

function sign(value: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

export function isAdminServer() {
  try {
    const cookieStore = cookies();
      const raw = cookieStore.get(COOKIE_NAME)?.value;
      if (raw) {
        const [value, signature] = raw.split('--');
        const secret = process.env.ADMIN_COOKIE_SECRET || '';
        if (!secret) return false; // secret missing but cookie found — don't accept
        const expected = sign(value, secret);
        if (value === '1' && signature === expected) return true;
      }
    // Fallback: check for an unsafe session-only cookie (no signature) when no secret is configured
    const sessionVal = cookieStore.get('isAdmin')?.value;
    if (!process.env.ADMIN_COOKIE_SECRET && process.env.NODE_ENV !== 'production' && sessionVal === '1') return true;
      return false;
  } catch (err) {
    return false;
  }
}
