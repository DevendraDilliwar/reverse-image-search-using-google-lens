// app/api/gemini/route.ts
import { GoogleGenAI, Modality } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const { image, prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const contents = [
      {
        parts: [
          { text: prompt },
          ...(image
            ? [
                {
                  inlineData: {
                    mimeType: "image/png",
                    data: image,
                  },
                },
              ]
            : []),
        ],
      },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const parts = result?.candidates?.[0]?.content?.parts;
    const imagePart = parts?.find((p: any) => p.inlineData?.data);

    if (!imagePart || !imagePart.inlineData || !imagePart.inlineData.data) {
      return NextResponse.json({ error: "No image in response" }, { status: 500 });
    }

    return NextResponse.json({ image: imagePart.inlineData.data });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
