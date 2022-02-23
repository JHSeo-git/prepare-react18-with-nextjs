export { getServerSideProps } from '@/components/EditorPage.server';

// TODO support `export { default }` in next.js

import EditorPage, {
  type EditorNoteProps,
} from '@/components/EditorPage.server';

export default function Editor(props: EditorNoteProps) {
  return <EditorPage {...props} />;
}
