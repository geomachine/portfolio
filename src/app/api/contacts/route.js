import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Contact from '@/lib/db/models/Contact';

// Public: submit contact form
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const contact = await Contact.create(body);
    return successResponse(contact, 201);
  } catch (e) {
    return errorResponse(e.message || 'Failed to submit', 500);
  }
}

// Admin: list all submissions with optional filter
export async function GET(request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read');
    const q    = searchParams.get('q') || '';

    const filter = {};
    if (read === 'false') filter.read = false;
    if (read === 'true')  filter.read = true;
    if (q) filter.$or = [
      { fullname: { $regex: q, $options: 'i' } },
      { email:    { $regex: q, $options: 'i' } },
      { message:  { $regex: q, $options: 'i' } },
    ];

    const contacts = await Contact.find(filter).sort({ createdAt: -1 }).lean();
    return successResponse(contacts);
  } catch {
    return errorResponse('Failed to fetch', 500);
  }
}
