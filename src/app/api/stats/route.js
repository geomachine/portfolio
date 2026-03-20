import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Blog from '@/lib/db/models/Blog';
import Contact from '@/lib/db/models/Contact';

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const [totalBlogs, totalMessages, unreadMessages] = await Promise.all([
      Blog.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
    ]);
    return successResponse({ totalBlogs, totalMessages, unreadMessages });
  } catch {
    return errorResponse('Failed to fetch stats', 500);
  }
}
