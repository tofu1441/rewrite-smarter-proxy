import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { input, tone } = await req.json();

  const prompt = `Rewrite the following text to sound more ${tone}, while keeping the original meaning:\n\n"${input}"`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a writing assistant that improves tone and clarity.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
  });

  const result = completion.choices[0].message.content;
  return NextResponse.json({ result });
}
