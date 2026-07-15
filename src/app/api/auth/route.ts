import { NextResponse } from 'next/server';
import { authenticateUser, createUser } from '@/lib/content-store';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password, name, mode } = await request.json();

  try {
    let user;
    if (mode === 'signup') {
      user = await createUser({ email, password, name, role: 'traveler' });
    } else {
      user = await authenticateUser(email, password);
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
    }

    const cookieStore = await cookies();
    cookieStore.set('user_session', JSON.stringify({ userId: user.id, email: user.email, name: user.name, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Auth failed' }, { status: 400 });
  }
}
