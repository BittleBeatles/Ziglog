'use client';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

interface MarkdownEditorProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: 'dark' | 'light';
  preview: 'edit' | 'live' | 'preview';
  hideToolbar: boolean;
  height: number;
  content: string;
}

const MarkdownEditor = forwardRef(
  (
    { content, theme, preview, hideToolbar, height }: MarkdownEditorProps,
    ref
  ) => {
    // const [value, setValue] = useState<string>(content);
    const editorRef = ref;
    const renderValueWithBookmarkList = (text: string) => {
      return text.replace(/\[\[\]\]/g, '[[bookmark-list]]');
    };

    // const handleChange = (v: string) => {
    //   const updatedValue = renderValueWithBookmarkList(v);
    //   setValue(updatedValue);
    // };

    return (
      <div>
        <MDEditor
          // ref={editorRef}
          className="relative"
          data-color-mode={theme}
          height={height}
          // defaultValue={content}
          value={content}
          // onChange={(v) => handleChange(v || '')}
          preview={preview}
          hideToolbar={hideToolbar}
        ></MDEditor>
      </div>
    );
  }
);

export default MarkdownEditor;
