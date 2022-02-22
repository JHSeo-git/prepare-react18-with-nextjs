/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'img',
  'h1',
  'h2',
  'h3',
]);
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src'],
  }
);

export type TextWithMarkdownProps = {
  text: string;
};

export default function TextWithMarkdown({ text }: TextWithMarkdownProps) {
  return (
    <div
      className="text-with-markdown"
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(marked(text || ''), {
          allowedTags,
          allowedAttributes,
        }),
      }}
    />
  );
}
