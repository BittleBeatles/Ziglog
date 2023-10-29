'use client';
import { useParams } from 'next/navigation';
import MarkdownEditor from '@components/userPage/MarkdownEditor';
import PublicPrivateToggle from '@components/userPage/PublicPrivateToggle';
import Button from '@components/common/Button';
import { useState } from 'react';
import NoteTitleInput from '@components/userPage/NoteTitleInput';

// decodeURIComponent(params.userNickname as string)
export default function EditNote() {
  const theme = 'light';
  const params = useParams();
  const [isPublic, setIsPublic] = useState(false);
  const [noteTitle, setNoteTitle] = useState('글 제목');

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-3">
        <NoteTitleInput
          theme={theme}
          noteTitle={noteTitle}
          onChange={(e) => {
            setNoteTitle(e.target.value);
          }}
        />
        <div className="flex flex-row items-center gap-3">
          <PublicPrivateToggle
            onClick={() => setIsPublic(!isPublic)}
            scope={isPublic ? 'Public' : 'Private'}
            theme={theme}
          />
          <Button label={isPublic ? '게시하기' : '저장하기'} color="charcol" />
        </div>
      </div>
      <MarkdownEditor theme={theme} />
    </div>
  );
}
