import React from 'react';

import TextWithMarkdown from './TextWithMarkdown';

export type NotePreviewType = {
  title?: string;
  body: string;
};

export default function NotePreview({ title, body }: NotePreviewType) {
  return (
    <div className="note-preview">
      <TextWithMarkdown text={body} />
    </div>
  );
}
