import { useState } from 'react';
import dynamic from 'next/dynamic';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

interface MarkdownEditorProps {
  theme: 'dark' | 'light';
}

export default function MarkdownEditor({ theme }: MarkdownEditorProps) {
  const [value, setValue] = useState<string>();
  return (
    <div>
      <MDEditor
        data-color-mode={theme}
        height={600}
        value={value}
        onChange={(v) => setValue(v || '')}
      ></MDEditor>
    </div>
  );
}
