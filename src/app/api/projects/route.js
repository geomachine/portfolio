import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Project from '@/lib/db/models/Project';

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return successResponse(projects);
  } catch {
    return errorResponse('Failed to fetch projects', 500);
  }
}

export async function POST(request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const body = await request.json();
    const project = await Project.create(body);
    return successResponse(project, 201);
  } catch (e) {
    return errorResponse(e.message || 'Failed to create', 500);
  }
}
