import { frontendAgent } from '@/lib/frontend-agent/agent';
import { run } from '@openai/agents';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    // Run the agent
    const result = await run(frontendAgent, message, {
      maxTurns: 5, // Limit iterations to prevent infinite loops
    });

    return NextResponse.json({
      output: String(result.finalOutput || ''),
      success: true,
      metadata: {
        model: 'gpt-4o-mini',
      },
    });
  } catch (error: any) {
    console.error('Frontend Agent Error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Internal server error',
        success: false,
      },
      { status: 500 }
    );
  }
}
