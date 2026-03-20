import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Contact from '@/lib/db/models/Contact';

// Trusted personal/business email providers — blocks disposable/unknown domains
const ALLOWED_DOMAINS = new Set([
  // Google
  'gmail.com', 'googlemail.com',
  // Microsoft
  'outlook.com', 'hotmail.com', 'hotmail.co.uk', 'hotmail.fr', 'live.com',
  'live.co.uk', 'msn.com', 'passport.com',
  // Yahoo
  'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in', 'yahoo.fr', 'yahoo.de',
  'yahoo.es', 'yahoo.it', 'yahoo.ca', 'yahoo.com.au', 'ymail.com',
  // Apple
  'icloud.com', 'me.com', 'mac.com',
  // ProtonMail
  'proton.me', 'protonmail.com', 'pm.me',
  // Zoho
  'zoho.com', 'zohomail.com',
  // Other reputable
  'aol.com', 'aim.com', 'mail.com', 'gmx.com', 'gmx.net', 'gmx.de',
  'tutanota.com', 'tutamail.com', 'tuta.io',
  'fastmail.com', 'fastmail.fm',
  'hey.com',
  'pm.me',
]);

function isAllowedEmail(email) {
  const parts = email.toLowerCase().trim().split('@');
  if (parts.length !== 2) return false;
  return ALLOWED_DOMAINS.has(parts[1]);
}

// Public: submit contact form
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.email || !isAllowedEmail(body.email)) {
      return errorResponse(
        'Please use a verified email provider (Gmail, Outlook, Yahoo, iCloud, ProtonMail, etc.)',
        422
      );
    }

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
