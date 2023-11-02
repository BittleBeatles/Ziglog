'use client';
import { redirect, useParams } from 'next/navigation';
import MarkdownEditor from '@components/userPage/MarkdownEditor';
import PublicPrivateToggle from '@components/userPage/PublicPrivateToggle';
import Button from '@components/common/Button';
import { useEffect, useRef, useState } from 'react';
import NoteTitleInput from '@components/userPage/NoteTitleInput';
import QuotationModal from '@components/userPage/QuotationModal';
import { getNoteInfo } from '@api/note/note';
import {
  sendEditNoteInfoRequest,
  changeNotePublicStatusRequest,
} from '@api/note/editNote';
import { EditNoteParams } from '@api/note/types';
import { diffChars } from 'diff';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

interface NoteDetail extends EditNoteParams {
  isPublic: boolean;
}

export default function EditNote() {
  const theme = 'light';
  const params = useParams();
  const noteId = params.noteId as string;
  const [oldContent, setOldContent] = useState({ title: '', content: '' });
  const [data, setData] = useState<NoteDetail>({
    title: '글제목',
    content: '',
    isPublic: false,
    quotingNotes: [],
  });
  const editorRef = useRef<HTMLDivElement>(null);
  const quotationModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getNoteInfoEditPage = async (noteId: number) => {
      const result = await getNoteInfo(noteId);
      console.log(result.content);
      if (result) {
        console.log(result);
        setOldContent({
          ...data,
          title: result.title,
          content: result.content,
        });
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

  useEffect(() => {}, [data.content]);

  const handlePublicPrivateButton = () => {
    const changePublicStatus = async (noteId: number, isPublic: boolean) => {
      const body = { isPublic: !data.isPublic };
      const result = await changeNotePublicStatusRequest(noteId, body);
      if (result) {
        setData({ ...data, isPublic: result.isPublic });
        alert('공개/비공개 설정이 수정되었습니다.');
      }
    };
    changePublicStatus(parseInt(noteId), data.isPublic);
  };

  const handleNoteEdit = () => {
    if (
      diffChars(oldContent.content, data.content).length !== 1 ||
      diffChars(oldContent.title, data.title).length !== 1
    ) {
      const body = {
        title: data.title,
        content: data.content,
        quotingNotes: data.quotingNotes,
      };
      const editNote = async (body: EditNoteParams) => {
        const result = await sendEditNoteInfoRequest(parseInt(noteId), body);
        if (result) {
          alert('정보 수정이 성공적으로 일어났습니다.');
          redirect(
            `/user-page/${params.userNickname}/read-note/${params.noteId}`
          );
        }
      };
      editNote(body);
    } else {
      alert('수정사항이 없습니다');
    }
  };

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
            onClick={() => handlePublicPrivateButton()}
            scope={data.isPublic ? 'Public' : 'Private'}
            theme={theme}
          />
          <Button
            label={data.isPublic ? '게시하기' : '저장하기'}
            color="charcol"
            onClick={() => handleNoteEdit()}
          />
        </div>
      </div>
      <MDEditor
        className="relative"
        data-color-mode={theme}
        height={600}
        value={data.content}
        onChange={(v) => setData({ ...data, content: v || '' })}
        preview={'live'}
        hideToolbar={false}
      ></MDEditor>
      <div ref={quotationModalRef} className="absolute">
        <QuotationModal />
      </div>
    </div>
  );
}
