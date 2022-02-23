import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '@/lib/redis';
import { getUser } from '@/lib/session';

const notesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const consoleTime = Date.now();
    console.time(`get all items from redis:${consoleTime}`);

    const notes = (await redis.hvals('rsc:notes_2'))
      .map(note => JSON.parse(note))
      .sort((a, b) => b.id - a.id);

    console.timeEnd(`get all items from redis:${consoleTime}`);
    return res.json(notes);
  }

  const login = getUser(req);

  if (req.method === 'POST') {
    const consoleTime = Date.now();
    console.time(`create item from redis:${consoleTime}`);

    if ((await redis.hlen('rsc:notes_2')) >= 40) {
      // let's remove the oldest note
      const noteIds = (await redis.hkeys('rsc:notes_2')).sort();
      if (noteIds[0]) {
        await redis.hdel('rsc:notes_2', noteIds[0]);
      }
    }

    const id = Date.now();
    const newNote = {
      id,
      title: (req.body.title ?? '').slice(0, 255),
      updated_at: Date.now(),
      body: (req.body.body ?? '').slice(0, 2048),
      created_by: login,
    };

    await redis.hset('rsc:notes_2', id, JSON.stringify(newNote));
    console.timeEnd(`create item from redis:${consoleTime}`);

    return res.json(newNote);
  }

  return res.send('Method not allowed.');
};

export default notesApi;
