import React from 'react';

import { useData } from '@/lib/use-fetch';
import type { Note } from '@/lib/types';

import NoteUI from './NoteUI.server';

export type NoteProps = {
  selectedId: string | null;
  isEditing: boolean;
  login?: string;
};

export default function Note({ selectedId, isEditing, login }: NoteProps) {
  const apiKey = `/api/notes/${selectedId}`;
  const note =
    selectedId !== null
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useData<Note>(apiKey, key => fetch(key).then(r => r.json()), {
          revalidate: 1,
        })
      : null;

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return <NoteUI note={note} isEditing={isEditing} login={login} />;
}
