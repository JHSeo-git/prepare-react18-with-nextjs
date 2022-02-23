import { NextApiRequest, NextApiResponse } from 'next';
import redis from '@/lib/redis';
import { getUser } from '@/lib/session';

const notesIdApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = (+req.query.id).toString();

  const timeKey = `get item from redis ${req.method}`;
  console.time(timeKey);

  const rawNote = await redis.hget('rsc:notes_2', id);
  const note = rawNote ? JSON.parse(rawNote) : null;

  console.timeEnd(timeKey);

  if (req.method === 'GET') {
    return res.send(note ?? 'null');
  }

  const login = getUser(req);

  if (req.method === 'DELETE') {
    console.time('delete item from redis');
    await redis.hdel('rsc:notes_2', id);
    console.timeEnd('delete item from redis');

    return res.status(204).send(null);
  }

  if (req.method === 'PUT') {
    console.time('update item from redis');
    const updated = {
      id,
      title: (req.body.title ?? '').slice(0, 255),
      updated_at: Date.now(),
      body: (req.body.body ?? '').slice(0, 2048),
      created_by: login,
    };
    await redis.hset('rsc:notes_2', id, JSON.stringify(updated));
    console.timeEnd('update item from redis');

    return res.json(updated);
  }

  return res.send('Method not allowed.');
};
export default notesIdApi;
