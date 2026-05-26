import { NextResponse } from 'next/server';
import { generateStudyPlanDeepSeek } from '@/lib/deepseek';

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_PLAN_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  try {
    const { targetLevel, xp, streak, wordStats } = await req.json();
    if (!targetLevel) {
      return NextResponse.json({ error: 'Missing targetLevel' }, { status: 400 });
    }

    const result = await generateStudyPlanDeepSeek(
      { targetLevel, xp, streak, wordStats },
      apiKey
    );
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
