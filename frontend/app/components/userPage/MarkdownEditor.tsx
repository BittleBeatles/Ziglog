import { useState } from 'react';
import dynamic from 'next/dynamic';
import BookmarkList from './SideBar/BookmarkList';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

interface MarkdownEditorProps {
  theme: 'dark' | 'light';
}

export default function MarkdownEditor({ theme }: MarkdownEditorProps) {
  const [value, setValue] = useState<string>();
  const renderValueWithBookmarkList = (text: string) => {
    return text.replace(/\[\[/g, '[[bookmark-list]]');
  };

  const handleChange = (v: string) => {
    const updatedValue = renderValueWithBookmarkList(v);
    setValue(updatedValue);
  };
  return (
    <div>
      <MDEditor
        data-color-mode={theme}
        height={600}
        value={value}
        onChange={(v) => handleChange(v || '')}
      ></MDEditor>
      {value && value.includes('[[bookmark-list]]') && (
        <BookmarkList noteList={[]} theme={theme} />
      )}
    </div>
  );
}
