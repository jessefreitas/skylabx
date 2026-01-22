import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const audits = await prisma.stackAudit.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    return NextResponse.json(audits);
  } catch (error) {
    console.error("Failed to fetch audits:", error);
    return NextResponse.json([], { status: 500 });
  }
}
