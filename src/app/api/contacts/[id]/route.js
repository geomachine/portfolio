import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Contact from '@/lib/db/models/Contact';

export async function PATCH(request, { params }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!contact) return errorResponse('Not found', 404);
    return successResponse(contact);
  } catch {
    return errorResponse('Failed to update', 500);
  }
}

export async function DELETE(_, { params }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { id } = await params;
    await Contact.findByIdAndDelete(id);
    return successResponse({ message: 'Deleted' });
  } catch {
    return errorResponse('Failed to delete', 500);
  }
}
