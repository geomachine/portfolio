import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Resume from '@/lib/db/models/Resume';

export async function GET() {
  try {
    await connectDB();
    const resume = await Resume.findOne().lean();
    return successResponse(resume);
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
    const resume = await Resume.findOneAndUpdate({}, body, { new: true, upsert: true }).lean();
    return successResponse(resume);
  } catch (e) {
    return errorResponse(e.message || 'Failed to update', 500);
  }
}
