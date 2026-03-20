import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Blog from '@/lib/db/models/Blog';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}, { content: 0 }).sort({ createdAt: -1 }).lean();
    return successResponse(blogs);
  } catch {
    return errorResponse('Failed to fetch blogs', 500);
  }
}

export async function POST(request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const body = await request.json();
    const blog = await Blog.create(body);
    return successResponse(blog, 201);
  } catch (e) {
    return errorResponse(e.message || 'Failed to create blog', 500);
  }
}
