'use client';
import { redirect, useParams } from 'next/navigation';
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
import { useAppSelector } from '@store/store';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

export interface NoteDetail extends EditNoteParams {
  isPublic: boolean;
}

export default function EditNote() {
  const titleRef = useRef<HTMLInputElement>(null);
  const { theme, isLogin } = useAppSelector((state) => state.user);
  const params = useParams();
  const noteId = decodeURIComponent(params.noteId as string);
  const nickname = decodeURIComponent(params.userNickname as string);
  const [oldContent, setOldContent] = useState({ title: '', content: '' });
  const [title, setTitle] = useState('글제목');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [quotingNotes, setQuotingNotes] = useState([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const quotationModalRef = useRef<HTMLDivElement>(null);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const getNoteInfoEditPage = async (noteId: number) => {
      const result = await getNoteInfo(noteId, isLogin);
      if (result.statusCode === 200) {
        setHasAccess(true);
        setOldContent({
          ...oldContent,
          title: result.data.title,
          content: result.data.content,
        });
        setTitle(result.data.title);
        setContent(result.data.content);
        setIsPublic(result.data.isPublic);
      } else {
        alert(`${result.message}`);
        window.location.replace(`/user-page/${nickname}`);
      }
    };
    getNoteInfoEditPage(parseInt(noteId));
  }, [noteId, oldContent]);

  const handlePublicPrivateButton = () => {
    const changePublicStatus = async (noteId: number, isPublic: boolean) => {
      const body = { isPublic: !isPublic };
      const result = await changeNotePublicStatusRequest(noteId, body);
      if (result) {
        setIsPublic(!isPublic);
        alert('공개/비공개 설정이 수정되었습니다.');
      }
    };
    changePublicStatus(parseInt(noteId), isPublic);
  };

  const handleNoteEdit = () => {
    if (
      diffChars(oldContent.content, content).length !== 1 ||
      diffChars(oldContent.title, title).length !== 1
    ) {
      const body = {
        title: title,
        content: content,
        quotingNotes: quotingNotes,
      };
      const editNote = async (body: EditNoteParams) => {
        const result = await sendEditNoteInfoRequest(parseInt(noteId), body);
        if (result) {
          alert('정보 수정이 성공적으로 일어났습니다.');
          window.location.replace(
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
    hasAccess && (
      <div>
        <div className="flex flex-row justify-between items-center mb-3">
          <NoteTitleInput
            ref={titleRef}
            theme={theme}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-row items-center gap-3">
            <PublicPrivateToggle
              onClick={() => handlePublicPrivateButton()}
              scope={isPublic ? 'Public' : 'Private'}
              theme={theme}
            />
            <Button
              label={isPublic ? '게시하기' : '저장하기'}
              color="charcol"
              onClick={() => handleNoteEdit()}
            />
          </div>
        </div>
        <MDEditor
          className="relative"
          data-color-mode={theme}
          height={600}
          value={content}
          onChange={(v) => setContent(v || '')}
          preview={'live'}
          hideToolbar={false}
        ></MDEditor>
        <div ref={quotationModalRef} className="absolute">
          <QuotationModal />
        </div>
      </div>
    )
  );
}
