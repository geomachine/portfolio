import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import About from '@/lib/db/models/About';

export async function GET() {
  try {
    await connectDB();
    const about = await About.findOne().lean();
    return successResponse(about);
  } catch {
    return errorResponse('Failed to fetch', 500);
  }
}

export async function PUT(request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const body = await request.json();
    const about = await About.findOneAndUpdate({}, body, { new: true, upsert: true }).lean();
    return successResponse(about);
  } catch (e) {
    return errorResponse(e.message || 'Failed to update', 500);
  }
}
