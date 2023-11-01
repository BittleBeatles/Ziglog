'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

interface MarkdownEditorProps {
  theme: 'dark' | 'light';
  preview: 'edit' | 'live' | 'preview';
  hideToolbar: boolean;
  height: number;
}

const MarkdownEditor = forwardRef(
  ({ theme, preview, hideToolbar, height }: MarkdownEditorProps, ref) => {
    const [value, setValue] = useState<string>();
    const editorRef = ref;
    const renderValueWithBookmarkList = (text: string) => {
      return text.replace(/\[\[\]\]/g, '[[bookmark-list]]');
    };

    const handleChange = (v: string) => {
      const updatedValue = renderValueWithBookmarkList(v);
      setValue(updatedValue);
    };

    // useEffect(() => {
    //   if (editorRef.current && quotationModalRef.current) {
    //     const editor = editorRef.current;
    //     const quotationModal = quotationModalRef.current;
    //     if (value && value.includes('[[bookmark-list]]')) {
    //       console.log('value check');
    //       const bookMarkListPosition = value?.indexOf('[[bookmark-list]]');
    //       const editorRect = editor.getBoundingClientRect();
    //       const top = editorRect.top + bookMarkListPosition;
    //       quotationModal.style.top = top + 'px';
    //       quotationModal.style.position = 'absolute';
    //     }
    //   }
    // }, [value]);

    return (
      <div>
        <MDEditor
          // ref={editorRef}
          className="relative"
          data-color-mode={theme}
          height={height}
          value={value}
          onChange={(v) => handleChange(v || '')}
          preview={preview}
          hideToolbar={hideToolbar}
        ></MDEditor>
      </div>
    );
  }
);

export default MarkdownEditor;