import { NextResponse } from 'next/server';
import { createExperience, getExperiences } from '@/lib/content-store';

export async function GET() {
  const experiences = await getExperiences();
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  const body = await request.json();
  const experience = await createExperience(body);
  return NextResponse.json(experience, { status: 201 });
}
