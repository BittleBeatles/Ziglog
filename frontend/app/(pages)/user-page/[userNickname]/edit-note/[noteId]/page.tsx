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
import * as commands from '@uiw/react-md-editor/lib/commands';
import { getBookmark } from '@api/bookmark/bookmark';
import { Note } from '@api/bookmark/types';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const {} = commands;

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
  const [quotingList, setQuotingList] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<Note[]>([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [quotingNoteInfo, setQuotingNoteInfo] = useState({
    nickname: '',
    title: '',
    noteId: 0,
  });

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
    const getBookmarkList = async () => {
      const result = await getBookmark();
      if (result) {
        setBookmarks(result.notes);
      }
    };
    getNoteInfoEditPage(parseInt(noteId));
    getBookmarkList();
  }, []);

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
      (oldContent.content &&
        diffChars(oldContent.content, content).length !== 1) ||
      (oldContent.title && diffChars(oldContent.title, title).length !== 1) ||
      (!oldContent.content && content) ||
      (!oldContent.title && title)
    ) {
      const body = {
        title: title,
        content: content,
        quotingNotes: quotingList,
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
          commands={[
            ...commands.getCommands(),
            commands.divider,
            commands.group([], {
              name: 'update',
              groupName: 'update',
              icon: (
                <svg viewBox="0 0 1024 1024" width="12" height="12">
                  <path
                    fill="currentColor"
                    d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
                  />
                </svg>
              ),
              children: ({ execute }) => {
                useEffect(() => {
                  execute();
                }, [quotingNoteInfo]);
                return (
                  <div>
                    <QuotationModal
                      bookmarks={bookmarks}
                      setQuotingNoteInfo={setQuotingNoteInfo}
                    />
                  </div>
                );
              },
              execute: (
                state: commands.ExecuteState,
                api: commands.TextAreaTextApi
              ) => {
                console.log('>>>>>>update>>>>>', state);
                let modifyText = `[[${state.selectedText}]]`;
                if (!state.selectedText) {
                  modifyText = `[[${quotingNoteInfo.nickname} : ${quotingNoteInfo.title}]] `;
                }
                api.replaceSelection(modifyText);
                if (!quotingList.includes(quotingNoteInfo.noteId)) {
                  setQuotingList([...quotingList, quotingNoteInfo.noteId]);
                }
              },
              buttonProps: { 'aria-label': 'See Bookmark List' },
            }),
          ]}
        ></MDEditor>
      </div>
    )
  );
}
