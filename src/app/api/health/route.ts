import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'geostreak',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
}
