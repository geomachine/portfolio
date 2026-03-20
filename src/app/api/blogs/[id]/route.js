import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Blog from '@/lib/db/models/Blog';

export async function GET(_, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findById(id).lean();
    if (!blog) return errorResponse('Not found', 404);
    return successResponse(blog);
  } catch {
    return errorResponse('Failed to fetch blog', 500);
  }
}

export async function PATCH(request, { params }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!blog) return errorResponse('Not found', 404);
    return successResponse(blog);
  } catch (e) {
    return errorResponse(e.message || 'Failed to update', 500);
  }
}

export async function DELETE(_, { params }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id).lean();
    if (!blog) return errorResponse('Not found', 404);
    return successResponse({ message: 'Deleted' });
  } catch {
    return errorResponse('Failed to delete', 500);
  }
}
