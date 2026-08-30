import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const GUIDE_WHATSAPP = '254 723388905';

function encodeWhatsAppText(text: string): string {
  return encodeURIComponent(text);
}

export async function GET() {
  return NextResponse.json({ message: 'Bookings are handled via WhatsApp.' }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session');

  let sessionUser: { userId?: string; name?: string; email?: string } | null = null;
  if (sessionCookie?.value) {
    try {
      sessionUser = JSON.parse(sessionCookie.value);
    } catch {
      sessionUser = null;
    }
  }

  const travelerName = body.travelerName || sessionUser?.name || 'Guest traveler';
  const travelerEmail = body.travelerEmail || sessionUser?.email || 'guest@example.com';
  const travelerPhone = body.travelerPhone || 'Not provided';
  const experienceId = body.experienceId || 'N/A';
  const date = body.date || 'Not specified';
  const amount = body.amount || 'N/A';
  const guestCount = body.guestCount ?? 'N/A';
  const travelers = Array.isArray(body.travelers) ? body.travelers : [];
  const paymentMethod = body.paymentMethod || 'Not specified';
  const status = body.status || 'Pending';
  const userId = sessionUser?.userId || 'guest';

  const travelerDetails = travelers
    .map((t: { name?: string; age?: string; type?: string }, idx: number) => {
      const name = t.name?.trim() || 'Not provided';
      const age = t.age?.trim() || 'N/A';
      const type = t.type?.trim() || 'N/A';
      return `Traveler ${idx + 1}: ${name}, Age: ${age}, Type: ${type}`;
    })
    .join('\n');

  const message = `New Booking Request\n\nGuest: ${travelerName}\nEmail: ${travelerEmail}\nPhone: ${travelerPhone}\nUser ID: ${userId}\nExperience ID: ${experienceId}\nDate: ${date}\nTotal Amount: ${amount}\nGuests: ${guestCount}\nPayment Method: ${paymentMethod}\nStatus: ${status}\n\nTraveler Details:\n${travelerDetails || 'No additional traveler details'}`;

  const whatsappUrl = `https://wa.me/${GUIDE_WHATSAPP}?text=${encodeWhatsAppText(message)}`;

  return NextResponse.json({ whatsappUrl, message });
}
