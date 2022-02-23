import { Suspense } from 'react';
import type { AppProps } from 'next/app';
import type { GetServerSideProps } from 'next';

import Page from './Page.server';
import NoteUI from './NoteUI.server';
import NoteSkeleton from './NoteSkeleton';

import { useData } from '@/lib/use-fetch';
import { getUser } from '@/lib/session';
import type { Note } from '@/lib/types';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: { login: getUser(req) },
  };
};

const defaultNote: Note = {
  id: null,
  title: 'Untitled',
  body: '',
  created_by: null,
  updated_at: null,
};

export type EditorNoteProps = {
  login?: string;
  searchText?: string;
} & AppProps;

export default function EditNote({
  login,
  searchText,
  router,
}: EditorNoteProps) {
  const { id } = router.query;
  let selectedId = id ?? null;

  if (Array.isArray(selectedId)) {
    selectedId = selectedId.join('');
  }

  const apiKey = `/api/notes/${selectedId}`;
  let note =
    selectedId !== null
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useData<Note>(apiKey, key => fetch(key).then(r => r.json()), {
          revalidate: 1,
        })
      : null;
  note = note ?? defaultNote;

  const isCreator = !selectedId || note.created_by === login;

  return (
    <Page login={login} searchText={searchText}>
      <Suspense fallback={<NoteSkeleton isEditing={isCreator} />}>
        <NoteUI note={note} isEditing={isCreator} login={login} />
      </Suspense>
    </Page>
  );
}
