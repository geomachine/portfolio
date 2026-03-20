import { cookies } from 'next/headers';
import { verifyAdminJwt } from './jwt';
import { errorResponse } from './response';

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session) return errorResponse('Unauthorized', 401);
  const payload = verifyAdminJwt(session.value);
  if (!payload) return errorResponse('Unauthorized', 401);
  return null;
}
