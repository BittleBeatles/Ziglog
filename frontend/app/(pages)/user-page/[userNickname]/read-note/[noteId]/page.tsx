'use client';
import { useParams, useRouter } from 'next/navigation';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import BookmarkQuoteInfo from '@components/userPage/BookmarkQuoteInfo';
import MarkdownPreview from '@uiw/react-markdown-preview';
import QuotationListBox from '@components/userPage/QuotationListBox';
import { NoteInfo } from '@api/note/types';
import { deleteNote, getNoteInfo } from '@api/note/note';
import { useEffect, useState, useContext } from 'react';
import { useAppSelector } from '@store/store';
import {
  isNoteBookmarked,
  addBookmark,
  deleteBookmark,
} from '@api/bookmark/bookmark';
import { showAlert } from '@src/util/alert';
import SideDataContext from '../../SideDataContext';
import { changeNotePublicStatusRequest } from '@api/note/editNote';
import PublicPrivateToggle from '@components/userPage/PublicPrivateToggle';
import { getQuoteData } from '@api/quote/quote';
import { quotingQuotedNotes } from '@api/quote/types';
import colors from '@src/design/color';
export default function ReadNote() {
  const router = useRouter();
  const { theme, isLogin } = useAppSelector((state) => state.user);
  const userNickname = useAppSelector((state) => state.user.nickname);
  const [quotationInfo, setQuotationInfo] = useState<quotingQuotedNotes>({
    quotingNotes: [],
    quotedNotes: [],
  });
  const params = useParams();
  const paramNoteId = decodeURIComponent(params.noteId as string);
  const paramsNickname = decodeURIComponent(params.userNickname as string);
  const [hasAccess, setHasAccess] = useState(false);
  const [data, setData] = useState<NoteInfo>({
    noteId: 1,
    title: '글제목',
    content: '글내용',
    nickname: '작성자',
    isPublic: false,
    bookmarkCount: 1,
    postTime: new Date('2023-10-31 00:00:00'),
    editTime: new Date('2023-10-31 00:00:00'),
  });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { getBookmarkList, getSideList, bookmarkList } =
    useContext(SideDataContext);
  const [isPublic, setIsPublic] = useState(false);
  // [GET 참조 목록]
  const getQuotationList = async (noteId: number) => {
    const result = await getQuoteData(noteId);
    if (result) {
      setQuotationInfo(result);
    }
  };
  const getIsBookmarked = async (noteId: number) => {
    if (isLogin) {
      const result = await isNoteBookmarked(noteId);
      if (result) {
        setIsBookmarked(result.bookmarked);
      }
    }
  };
  useEffect(() => {
    const getNoteReadPage = async (noteId: number) => {
      const result = await getNoteInfo(noteId, isLogin);
      if (result.statusCode === 200) {
        setHasAccess(true);
        setData({
          ...data,
          noteId: result.data.noteId,
          title: result.data.title,
          content: result.data.content,
          nickname: result.data.nickname,
          isPublic: result.data.isPublic,
          bookmarkCount: result.data.bookmarkCount,
          postTime: result.data.postTime,
          editTime: result.data.editTime,
        });
        setIsPublic(result.data.isPublic);
        getQuotationList(parseInt(paramNoteId));
      } else {
        router.push(`/user-page/${paramsNickname}`);
        showAlert(`${result.message}`, 'error');
      }
    };

    getNoteReadPage(parseInt(paramNoteId));
  }, [isPublic]);

  useEffect(() => {
    getIsBookmarked(parseInt(paramNoteId));
  }, [bookmarkList]);

  // 북마크 추가, 취소하기
  const handleBookmarkChange = async () => {
    if (isBookmarked) {
      const res = deleteBookmark(parseInt(paramNoteId));
      if (await res) {
        setData({ ...data, bookmarkCount: data.bookmarkCount - 1 });
        getBookmarkList();
      }
    } else {
      const res = addBookmark(parseInt(paramNoteId));
      if (await res) {
        setData({ ...data, bookmarkCount: data.bookmarkCount + 1 });
        getBookmarkList();
      }
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleDelete = async () => {
    await deleteNote(parseInt(paramNoteId), data.nickname);
    getSideList();
    getBookmarkList();
    router.push(`/user-page/${userNickname}`);
  };

  // 닉네임 클릭 시,
  const handleNicknameClick = () => {
    router.push(`/user-page/${data.nickname}`);
  };

  // 공개/비공개 여부 수정하기
  const handlePublicPrivateButton = () => {
    const changePublicStatus = async (noteId: number, isPublic: boolean) => {
      const body = { isPublic: !isPublic };
      const result = await changeNotePublicStatusRequest(noteId, body);
      if (result) {
        setIsPublic(!isPublic);
        showAlert('공개/비공개 설정이 수정되었습니다', 'success');
        getBookmarkList();
      }
    };
    changePublicStatus(parseInt(paramNoteId), isPublic);
  };

  const isMine = isLogin && userNickname === data.nickname;

  const PostTime: Date = new Date(data.postTime!);
  PostTime.setUTCHours(PostTime.getUTCHours());

  const year: number = PostTime.getFullYear();
  const month: number = PostTime.getMonth() + 1;
  const day: number = PostTime.getDate();
  const hour: number = PostTime.getHours();
  const minute: number = PostTime.getMinutes();
  const formattedDate =
    hour >= 12
      ? `${year}년 ${String(month).padStart(2, '0')}월 ${String(day).padStart(
          2,
          '0'
        )}일 오후 ${String(hour - 12).padStart(2, '0')}:${String(
          minute
        ).padStart(2, '0')}`
      : `${year}년 ${String(month).padStart(2, '0')}월 ${String(day).padStart(
          2,
          '0'
        )}일 오전 ${String(hour).padStart(2, '0')}:${String(minute).padStart(
          2,
          '0'
        )}`;

  return (
    hasAccess && (
      <div id="sidebar-scroll" className="overflow-y-auto h-full">
        <div className="absolute mt-40 ml-10">
          <BookmarkQuoteInfo
            theme={theme}
            bookmarkCount={data.bookmarkCount}
            quotedCount={quotationInfo.quotedNotes.length}
            isBookmarked={isBookmarked}
            handleBookmarkChange={handleBookmarkChange}
            isLogin={isLogin}
          />
        </div>
        <div className="px-32 py-10">
          <div className="flex gap-2 items-center mb-3 flex-wrap">
            <Text type="h1">{data.title}</Text>
            {isMine && (
              <PublicPrivateToggle
                onClick={() => handlePublicPrivateButton()}
                scope={isPublic ? 'Public' : 'Private'}
                theme={theme}
              />
            )}
          </div>

          <div className="flex items-center mb-12">
            <span
              className="cursor-pointer font-bold"
              onClick={handleNicknameClick}
            >
              {data.nickname}
            </span>

            {data.postTime && (
              <Text className="ml-3" type="p">
                {formattedDate}
              </Text>
            )}

            {isMine ? (
              <div className="flex">
                <div className="ml-3">
                  <Button
                    onClick={() =>
                      router.push(
                        `/user-page/${data.nickname}/edit-note/${paramNoteId}`
                      )
                    }
                    color="blue"
                    label="수정"
                    size="text-xs"
                  />
                </div>
                <div className="ml-3">
                  <Button
                    color="red"
                    onClick={handleDelete}
                    label="삭제"
                    size="text-xs"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="w-full mb-5">
            <MarkdownPreview
              source={data.content}
              style={{
                backgroundColor:
                  theme === 'light'
                    ? colors.white
                    : colors['dark-background-page'],
                color: theme === 'light' ? colors.black : colors.white,
              }}
            />
          </div>

          <div className="flex gap-3">
            <QuotationListBox
              userNickname={paramsNickname}
              label="이 글을 참조한 노트들"
              theme={theme}
              quotationList={quotationInfo.quotedNotes}
            />

            <QuotationListBox
              userNickname={paramsNickname}
              label="이 글이 참조하는 노트들"
              theme={theme}
              quotationList={quotationInfo.quotingNotes}
            />
          </div>
        </div>
      </div>
    )
  );
}
