import Link from 'next/link';
import { Suspense } from 'react';
import AuthButton from './AuthButton.server';
import NoteList from './NoteList.server';
import NoteListSkeleton from './NoteListSkeleton.';

import SearchField from './SearchField.client';

export type PageProps = {
  searchText?: string;
  login?: string;
  children: React.ReactNode;
};

function Page({ searchText = '', login, children }: PageProps) {
  return (
    <div className="container">
      <div className="banner">
        <a
          href="https://nextjs.org/docs/advanced-features/react-18"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about using React Server Components in Next.js →
        </a>
      </div>
      <div className="main">
        <input type="checkbox" className="sidebar-toggle" id="sidebar-toggle" />
        <section className="col sidebar">
          <Link href={'/'}>
            <a className="link--unstyled">
              <section className="sidebar-header">
                <img
                  className="logo"
                  src="/logo.svg"
                  width="22px"
                  height="20px"
                  alt=""
                  role="presentation"
                />
                <strong>React Notes</strong>
              </section>
            </a>
          </Link>
          <section className="sidebar-menu" role="menubar">
            <SearchField />
            <AuthButton login={login} noteId={null}>
              Add
            </AuthButton>
          </section>
          <nav>
            <Suspense fallback={<NoteListSkeleton />}>
              <NoteList searchText={searchText} />
            </Suspense>
          </nav>
        </section>
        <section className="col note-viewer">{children}</section>
      </div>
    </div>
  );
}

export default Page;
