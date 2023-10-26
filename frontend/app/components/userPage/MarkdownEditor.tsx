import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
export default function MarkdownEditor() {
  const [value, setValue] = useState<string>('Hello World!');
  return (
    <div className="container">
      <MDEditor value={value} onChange={(v) => setValue(v || '')}></MDEditor>
    </div>
  );
}
