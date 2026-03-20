import { cookies } from 'next/headers';
import { signAdminJwt } from '@/lib/api/jwt';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = signAdminJwt({ email });
      const cookieStore = await cookies();
      cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
      return successResponse({ message: 'Login successful' });
    }
    return errorResponse('Invalid credentials', 401);
  } catch {
    return errorResponse('Something went wrong', 500);
  }
}
