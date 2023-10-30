'use client';
import { useParams } from 'next/navigation';
import MarkdownEditor from '@components/userPage/MarkdownEditor';
import PublicPrivateToggle from '@components/userPage/PublicPrivateToggle';
import Button from '@components/common/Button';
import { useEffect, useRef, useState } from 'react';
import NoteTitleInput from '@components/userPage/NoteTitleInput';
import QuotationModal from '@components/userPage/QuotationModal';
import { getNoteInfo } from '@api/note/note';
// decodeURIComponent(params.userNickname as string)
export default function EditNote() {
  const theme = 'light';
  const params = useParams();
  const noteId = params.noteId as string;
  const [data, setData] = useState({
    title: '글제목',
    content: '',
    isPublic: false,
  });
  const editorRef = useRef<HTMLDivElement>(null);
  const quotationModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getNoteInfoEditPage = async (noteId: number) => {
      const result = await getNoteInfo(noteId);
      if (result) {
        setData({
          ...data,
          title: result.title,
          content: result.content,
          isPublic: result.isPublic,
        });
      }
    };
    getNoteInfoEditPage(parseInt(noteId));
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-3">
        <NoteTitleInput
          theme={theme}
          noteTitle={data.title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        />
        <div className="flex flex-row items-center gap-3">
          <PublicPrivateToggle
            onClick={() => setData({ ...data, isPublic: !data.isPublic })}
            scope={data.isPublic ? 'Public' : 'Private'}
            theme={theme}
          />
          <Button
            label={data.isPublic ? '게시하기' : '저장하기'}
            color="charcol"
          />
        </div>
      </div>
      <MarkdownEditor theme={theme} ref={editorRef} />
      <div ref={quotationModalRef} className="absolute">
        <QuotationModal />
      </div>
    </div>
  );
}
