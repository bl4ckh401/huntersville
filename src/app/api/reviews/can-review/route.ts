import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { canUserReviewExperience } from '@/lib/content-store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const experienceId = searchParams.get('experienceId');

  if (!experienceId) {
    return NextResponse.json({ allowed: false });
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session');

  if (!sessionCookie?.value) {
    return NextResponse.json({ allowed: false });
  }

  let sessionUser: { userId?: string } | null = null;
  try {
    sessionUser = JSON.parse(sessionCookie.value);
  } catch {
    sessionUser = null;
  }

  const allowed = await canUserReviewExperience(sessionUser?.userId || '', experienceId);
  return NextResponse.json({ allowed });
}
