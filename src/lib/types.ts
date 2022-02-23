import type { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export type Note = {
  id: string | null;
  title: string;
  created_by: string | null;
  updated_at: string | null;
  body: string;
};

export type NextPageRequest = IncomingMessage & {
  cookies: NextApiRequestCookies;
};
