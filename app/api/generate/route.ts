import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const imageFile = formData.get('image') as File;

  if (!imageFile) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }

  const clipdropApiKey = process.env.CLIPDROP_API_KEY;
  if (!clipdropApiKey) {
    return NextResponse.json({ error: 'Missing Clipdrop API key' }, { status: 500 });
  }

  const apiForm = new FormData();
  apiForm.append('image_file', imageFile);

  try {
    const response = await fetch('https://clipdrop-api.co/reimagine/v1/reimagine', {
      method: 'POST',
      headers: {
        'x-api-key': clipdropApiKey,
      },
      body: apiForm,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || 'Clipdrop API error' }, { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
