import { type NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/session';

export default function middleware(req: NextRequest) {
  const user = getUser(req);

  if (req.method !== 'GET' && !user) {
    return new Response('Unauthorized', { status: 403 });
  }

  return NextResponse.next();
}
