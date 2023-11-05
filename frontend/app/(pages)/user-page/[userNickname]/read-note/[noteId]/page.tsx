'use client';
import { useParams, useRouter } from 'next/navigation';
import Text from '@components/common/Text';
import SvgIcon from '@components/common/SvgIcon';
import Button from '@components/common/Button';
import BookmarkQuoteInfo from '@components/userPage/BookmarkQuoteInfo';
import MarkdownPreview from '@uiw/react-markdown-preview';
import QuotationListBox from '@components/userPage/QuotationListBox';
import { NoteInfo } from '@api/note/types';
import { deleteNote, getNoteInfo, getReferenceList } from '@api/note/note';
import { useEffect, useState, useContext } from 'react';
import { useAppSelector } from '@store/store';
import { NoteRefListInfo } from '@api/note/types';
import {
  isNoteBookmarked,
  addBookmark,
  deleteBookmark,
} from '@api/bookmark/bookmark';
import './page.css';
import { showAlert } from '@src/util/alert';
import { useRouter } from 'next/navigation';
import SideDataContext from '../../SideDataContext';

export default function ReadNote() {
  const router = useRouter();
  const { theme, isLogin } = useAppSelector((state) => state.user);
  const userNickname = useAppSelector((state) => state.user.nickname);
  const [quotationInfo, setQuotationInfo] = useState<NoteRefListInfo>({
    quotationList: [],
  });
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const keyword = urlParams.get('keyword');
  // console.log('키워드:', keyword);
  // console.log('urlParams:', urlParams);
  // console.log('queryString:', queryString);
  const params = useParams();
  const router = useRouter();
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
  const { getBookmarkList } = useContext(SideDataContext);
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
        getQuotationList(parseInt(paramNoteId));
      } else {
        router.push(`/user-page/${paramsNickname}`);
        showAlert(`${result.message}`, 'error');
      }
    };
    const getQuotationList = async (noteId: number) => {
      const result = await getReferenceList(noteId);
      if (result) {
        setQuotationInfo(result);
        getIsBookmarked(noteId);
      }
    };
    const getIsBookmarked = async (noteId: number) => {
      const result = await isNoteBookmarked(noteId);
      if (result) {
        setIsBookmarked(result.bookmarked);
      }
    };
    getNoteReadPage(parseInt(paramNoteId));
  }, []);

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

  // 닉네임 클릭 시,
  const handleNicknameClick = () => {
    router.push(`/user-page/${data.nickname}`);
  };

  const isMine = isLogin && userNickname === data.nickname;
  return (
    hasAccess && (
      <div id="sidebar-scroll" className="overflow-y-auto h-full">
        <div className="mx-40 my-12">
          <Text type="h1">{data.title}</Text>
          <div className="flex flex-row place-items-center my-4">
            <span
              className=" cursor-pointer font-bold"
              onClick={handleNicknameClick}
            >
              {data.nickname}
            </span>
            <Text className="mx-3" type="p">
              {data.postTime && data.postTime.toLocaleString('ko-KR')}
            </Text>

            {data.isPublic ? (
              <SvgIcon
                name="Public"
                size={20}
                color={theme === 'light' ? 'black' : 'white'}
              ></SvgIcon>
            ) : (
              <SvgIcon
                name="Private"
                size={20}
                color={theme === 'light' ? 'black' : 'white'}
              ></SvgIcon>
            )}

            {isMine ? (
              <div className="flex flex-row">
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
                  ></Button>
                </div>
                <div className="ml-3">
                  <Button
                    color="red"
                    onClick={() =>
                      deleteNote(parseInt(paramNoteId), data.nickname)
                    }
                    label="삭제"
                    size="text-xs"
                  ></Button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="flex flex-row mx-16">
          <div className="absolute">
            <BookmarkQuoteInfo
              theme={theme}
              bookmarkCount={data.bookmarkCount}
              quotedCount={quotationInfo.quotationList.length}
              isBookmarked={isBookmarked}
              handleBookmarkChange={handleBookmarkChange}
              isLogin={isLogin}
            ></BookmarkQuoteInfo>
          </div>

          <div data-color-mode={theme} className="w-full mx-24">
            <div className="wmde-markdown-var">
              <MarkdownPreview source={data.content} />
            </div>
          </div>
        </div>
        <div className="mx-40 mt-10 mb-4">
          <QuotationListBox
            theme={theme}
            quotationList={quotationInfo.quotationList}
          ></QuotationListBox>
        </div>
      </div>
    )
  );
}
