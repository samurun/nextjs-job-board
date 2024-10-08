'use client';

import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import React from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export default React.forwardRef<Object, EditorProps>(
  function RichTextEditor(props, ref) {
    return (
      <Editor
        editorClassName={cn(
          'border-x border-b rounded-md rounded-t-none px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1',
          props.editorClassName
        )}
        toolbarClassName='mb-0 rounded-b-none'
        toolbar={{
          options: ['inline', 'list', 'link', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
        }}
        editorRef={(r) => {
          if (typeof ref === 'function') {
            ref(r);
          } else if (ref) {
            ref.current = r;
          }
        }}
        {...props}
      />
    );
  }
);
