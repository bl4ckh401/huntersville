import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files').filter((entry): entry is File => entry instanceof File);

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const urls = await Promise.all(
      files.map(async (file) => {
        const extension = path.extname(file.name) || '.bin';
        const fileName = `${randomUUID()}${extension}`;
        const destination = path.join(uploadDir, fileName);
        const bytes = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(destination, bytes);
        return `/uploads/${fileName}`;
      }),
    );

    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 });
  }
}
