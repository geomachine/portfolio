import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Blog from '@/lib/db/models/Blog';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page  = Math.max(1, parseInt(searchParams.get('page')  || '1'));
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));
    const q     = searchParams.get('q') || '';

    const filter = q
      ? { $or: [{ title: { $regex: q, $options: 'i' } }, { category: { $regex: q, $options: 'i' } }, { tags: { $regex: q, $options: 'i' } }] }
      : {};

    const [blogs, total] = await Promise.all([
      Blog.find(filter, { content: 0 }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Blog.countDocuments(filter),
    ]);

    return successResponse({ items: blogs, total, page, pages: Math.ceil(total / limit) });
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
