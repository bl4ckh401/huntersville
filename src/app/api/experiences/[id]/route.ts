import { NextResponse } from 'next/server';
import { getExperienceById } from '@/lib/content-store';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
  }

  return NextResponse.json(experience);
}
