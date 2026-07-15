import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserById } from '@/lib/content-store';

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session');

  if (!sessionCookie?.value) {
    return NextResponse.json({ user: null });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    const user = await getUserById(session.userId);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
