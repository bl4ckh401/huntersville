import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createReview, getReviewsForExperience } from '@/lib/content-store';

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
  const body = await request.json();
  const experienceId = body.experienceId as string | undefined;
  const userName = (body.userName as string | undefined)?.trim();
  const title = (body.title as string | undefined)?.trim();
  const comment = (body.comment as string | undefined)?.trim();
  const rating = body.rating as number | undefined;

  if (!experienceId || !title || !comment) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Try to get user info from session if available, otherwise use the provided name
  let reviewerName = userName || 'Anonymous Traveler';
  let userId = `guest-${Date.now()}`;

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session');
  if (sessionCookie?.value) {
    try {
      const sessionUser = JSON.parse(sessionCookie.value);
      if (sessionUser?.name) reviewerName = sessionUser.name;
      if (sessionUser?.userId) userId = sessionUser.userId;
    } catch {
      // ignore parse errors, use guest defaults
    }
  }

  const review = await createReview({
    experienceId,
    userId,
    userName: reviewerName,
    title,
    comment,
    rating: rating ?? 5,
  });

  return NextResponse.json(review, { status: 201 });
}
