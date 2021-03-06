import { Suspense } from 'react';
import type { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app';

import Note from '@/components/Note.server';
import Page from '@/components/Page.server';
import NoteSkeleton from '@/components/NoteSkeleton';

import { getUser } from '@/lib/session';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: { login: getUser(req) },
  };
};

export type HomePageProps = {
  login?: string;
  searchText?: string;
} & AppProps;

function HomePage({ login, searchText = '', router }: HomePageProps) {
  const { id } = router.query;
  let selectedId = id ?? null;

  if (Array.isArray(selectedId)) {
    selectedId = selectedId.join('');
  }

  return (
    <Page login={login} searchText={searchText}>
      <Suspense fallback={<NoteSkeleton isEditing={false} />}>
        <Note login={login} selectedId={selectedId} isEditing={false} />
      </Suspense>
    </Page>
  );
}

export default HomePage;
