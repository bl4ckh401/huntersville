import { NextResponse } from 'next/server';
import { getGalleryImages, createGalleryImage, type GalleryImageInput } from '@/lib/content-store';

export async function GET() {
  try {
    const images = await getGalleryImages();
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const input: GalleryImageInput = {
      album: body.album,
      headline: body.headline,
      count: body.count,
      location: body.location,
      naturalist: body.naturalist,
      optics: body.optics,
      description: body.description,
      src: body.src,
      alt: body.alt,
      tags: body.tags || [],
      category: body.category,
      sanctuary: body.sanctuary,
      featured: body.featured || false,
      time: body.time,
      span: body.span || 'standard',
    };

    const image = await createGalleryImage(input);
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}