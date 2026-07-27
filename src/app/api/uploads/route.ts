import { NextResponse } from 'next/server';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

export async function POST(request: Request) {
  try {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      return NextResponse.json(
        { error: 'Cloudinary configuration missing' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('files').filter((entry): entry is File => entry instanceof File);

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const urls = await Promise.all(
      files.map(async (file) => {
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', UPLOAD_PRESET);
        uploadData.append('folder', 'huntersville');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: uploadData,
          }
        );

        if (!response.ok) {
          throw new Error(`Cloudinary upload failed: ${response.status}`);
        }

        const result = await response.json();
        return result.secure_url;
      })
    );

    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}