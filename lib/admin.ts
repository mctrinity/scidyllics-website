import { cookies } from 'next/headers';

export function isAdminServer() {
  try {
    const cookieStore = cookies();
    const isAdmin = cookieStore.get('isAdmin')?.value;
    return isAdmin === '1';
  } catch (err) {
    return false;
  }
}
