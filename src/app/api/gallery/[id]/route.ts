import { NextResponse } from 'next/server';
import { getGalleryImageById, updateGalleryImage, deleteGalleryImage } from '@/lib/content-store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const image = await getGalleryImageById(id);
    
    if (!image) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 });
    }
    
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch gallery image' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const image = await updateGalleryImage(id, body);
    
    if (!image) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 });
    }
    
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update gallery image' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteGalleryImage(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}