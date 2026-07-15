import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { canUserReviewExperience, createReview, getReviewsForExperience } from '@/lib/content-store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const experienceId = searchParams.get('experienceId');

  if (!experienceId) {
    return NextResponse.json([]);
  }

  const reviews = await getReviewsForExperience(experienceId);
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session');

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: 'You must be signed in to leave a review' }, { status: 401 });
  }

  let sessionUser: { userId?: string; name?: string } | null = null;
  try {
    sessionUser = JSON.parse(sessionCookie.value);
  } catch {
    sessionUser = null;
  }

  const body = await request.json();
  const experienceId = body.experienceId as string | undefined;
  const userId = sessionUser?.userId;

  if (!experienceId || !userId) {
    return NextResponse.json({ error: 'Missing experience or profile' }, { status: 400 });
  }

  const allowed = await canUserReviewExperience(userId, experienceId);
  if (!allowed) {
    return NextResponse.json({ error: 'Only travelers with a confirmed booking can leave a review' }, { status: 403 });
  }

  const review = await createReview({
    ...body,
    userId,
    userName: sessionUser?.name || 'Traveler',
  });

  return NextResponse.json(review, { status: 201 });
}
