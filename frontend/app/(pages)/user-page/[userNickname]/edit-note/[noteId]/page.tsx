'use client';
import { useParams } from 'next/navigation';

import Button from '@components/common/Button';
import { useContext, useEffect, useRef, useState } from 'react';
import NoteTitleInput from '@components/userPage/NoteTitleInput';
import QuotationModal from '@components/userPage/QuotationModal';
import { getNoteInfo } from '@api/note/note';
import { sendEditNoteInfoRequest } from '@api/note/editNote';
import { EditNoteParams } from '@api/note/types';
import { diffChars } from 'diff';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@store/store';
import * as commands from '@uiw/react-md-editor/lib/commands';
import { getBookmark } from '@api/bookmark/bookmark';
import { Note } from '@api/bookmark/types';
import { showAlert } from '@src/util/alert';
import { useRouter } from 'next/navigation';
import SideDataContext from '../../SideDataContext';
import BookmarkCheckBox from '@components/userPage/BookmarkCheckBox';
import { getQuotingNoteIdData, putQuotingNoteIdData } from '@api/quote/quote';
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
  const [bookmarks, setBookmarks] = useState<Note[]>([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [quotingNoteIds, setQuotingNoteIds] = useState<number[]>([]);
  const [quotingNoteInfo, setQuotingNoteInfo] = useState({
    nickname: '',
    title: '',
    noteId: 0,
  });
  const { getBookmarkList, getSideList } = useContext(SideDataContext);
  const router = useRouter();
  const [idChange, setIdChange] = useState(false);
  // [마크다운용 북마크 가져오기]
  const getMdBookmarkList = async () => {
    const result = await getBookmark();
    if (result) {
      setBookmarks(result.notes);
    }
  };
  // [참조 노트 ID 목록 가져오기]
  const getQuotingNoteIdsList = async () => {
    const result = await getQuotingNoteIdData(parseInt(noteId));
    if (result) {
      setQuotingNoteIds(result.quotingNoteIds);
    }
  };
  // 노트 정보 불러오기 + 북마크 정보 가져오기 + 참조하는 노트 id 목록 가져오기
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

        getMdBookmarkList();
        getQuotingNoteIdsList();
      } else {
        router.push(`/user-page/${nickname}`);
        showAlert(`${result.message}`, 'error');
      }
    };
    getNoteInfoEditPage(parseInt(noteId));
  }, []);
  // 노트 수정하기
  const handleNoteEdit = () => {
    if (
      idChange ||
      (oldContent.content &&
        diffChars(oldContent.content, content).length !== 1) ||
      (oldContent.title && diffChars(oldContent.title, title).length !== 1) ||
      (!oldContent.content && content) ||
      (!oldContent.title && title)
    ) {
      const body = {
        title: title,
        content: content,
      };
      // 노트 제목 + 내용 수정
      const editNote = async (body: EditNoteParams) => {
        const result = await sendEditNoteInfoRequest(parseInt(noteId), body);
        if (result) {
          editQuotingNoteIds();
          window.location.replace(
            `/user-page/${params.userNickname}/read-note/${params.noteId}`
          );
          showAlert('수정되었습니다', 'success');
          getSideList();
          getBookmarkList();
        }
      };
      // 노트 참조 목록 수정
      const editQuotingNoteIds = async () => {
        const result = await putQuotingNoteIdData(
          parseInt(noteId),
          quotingNoteIds
        );
      };
      editNote(body);
    } else {
      showAlert('수정사항이 없습니다', 'info');
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
          height={400}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="12"
                  viewBox="0 -960 960 960"
                  width="12"
                >
                  <path
                    fill="currentColor"
                    d="M273.717-50q-52.442 0-90.08-37.088Q146-124.175 146-178v-604q0-53.825 37.799-90.912Q221.599-910 274.04-910h412.243q52.442 0 90.079 37.088Q814-835.825 814-782v604q0 53.825-37.799 90.912Q738.401-50 685.96-50H273.717ZM274-178h412v-604h-54v312l-96-48-96 48v-312H274v604Zm0 0v-604 604Zm166-292 96-48 96 48-96-48-96 48Z"
                  />
                </svg>
              ),
              children: (handle) => {
                useEffect(() => {
                  handle.execute();
                }, [quotingNoteInfo]);
                return (
                  <div>
                    <QuotationModal
                      userNickname={nickname}
                      theme={theme}
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
                if (quotingNoteInfo.noteId !== 0) {
                  let modifyText = `[[${state.selectedText}]]`;
                  if (!state.selectedText) {
                    modifyText = `[${quotingNoteInfo.nickname} : ${quotingNoteInfo.title}](${process.env.NEXT_PUBLIC_BASE_URL}/user-page/${quotingNoteInfo.nickname}/read-note/${quotingNoteInfo.noteId})`;
                  }
                  api.replaceSelection(modifyText);
                  setQuotingNoteInfo({ nickname: '', title: '', noteId: 0 });
                }
              },
              buttonProps: { 'aria-label': 'See Bookmark List' },
            }),
          ]}
        ></MDEditor>
        <BookmarkCheckBox
          theme={theme}
          bookmarkList={bookmarks}
          quotingNoteIds={quotingNoteIds}
          setQuotingNoteIds={setQuotingNoteIds}
          setIdChange={setIdChange}
        />
      </div>
    )
  );
}
