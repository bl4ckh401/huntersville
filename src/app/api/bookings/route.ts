import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createBooking, getBookings } from '@/lib/content-store';

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json(bookings);
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

  const booking = await createBooking({
    ...body,
    travelerName: body.travelerName || sessionUser?.name || 'Guest traveler',
    travelerEmail: body.travelerEmail || sessionUser?.email || 'guest@example.com',
    userId: sessionUser?.userId,
  });

  return NextResponse.json(booking, { status: 201 });
}
