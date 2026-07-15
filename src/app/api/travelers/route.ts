import { NextResponse } from 'next/server';
import { getTravelers } from '@/lib/content-store';

export async function GET() {
  const travelers = await getTravelers();
  return NextResponse.json(travelers);
}
