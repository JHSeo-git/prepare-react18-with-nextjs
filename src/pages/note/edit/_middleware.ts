import { type NextRequest, NextResponse } from 'next/server';
import { createDecrypt, getSession } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const decrypt = createDecrypt();
  const [userCookie, sessionCookie] = getSession(req);

  let login = null;
  let authErr = null;

  if (sessionCookie && userCookie) {
    try {
      login = await decrypt(sessionCookie);
    } catch (e) {
      console.error(e);
      authErr = e;
    }

    if (!authErr && login === userCookie) {
      return NextResponse.next();
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}
