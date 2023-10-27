import { useState } from 'react';
import dynamic from 'next/dynamic';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

export default function MarkdownEditor() {
  const [value, setValue] = useState<string>('Hello World!');
  return (
    <div>
      <MDEditor value={value} onChange={(v) => setValue(v || '')}></MDEditor>
    </div>
  );
}
