'use client';
import { useParams } from 'next/navigation';
import Text from '@components/common/Text';
import SvgIcon from '@components/common/SvgIcon';
import Button from '@components/common/Button';
import BookmarkQuoteInfo from '@components/userPage/BookmarkQuoteInfo';
import MarkdownPreview from '@uiw/react-markdown-preview';
import QuotationListBox from '@components/userPage/QuotationListBox';
import { NoteInfo } from '@api/note/types';
import { deleteNote, getNoteInfo } from '@api/note/note';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/store';
import './/page.css';

export default function ReadNote() {
  const { theme, isLogin } = useAppSelector((state) => state.user);

  const params = useParams();
  const noteId = params.noteId as string;
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
  useEffect(() => {
    const getNoteReadPage = async (noteId: number) => {
      const result = await getNoteInfo(noteId);
      if (result) {
        setData({
          ...data,
          noteId: result.noteId,
          title: result.title,
          content: result.content,
          nickname: result.nickname,
          isPublic: result.isPublic,
          bookmarkCount: result.bookmarkCount,
          postTime: result.postTime,
          editTime: result.editTime,
        });
      }
    };
    getNoteReadPage(parseInt(noteId));
  }, [data, noteId]);

  const isMine = true;
  return (
    <div id="sidebar-scroll" className="overflow-y-auto h-full">
      <div className="mx-40 my-12">
        <Text type="h1">{data.title}</Text>
        <div className="flex flex-row place-items-center my-4">
          <Text type="b">{data.nickname}</Text>
          <Text className="mx-3" type="p">
            {/* {data.postTime.toLocaleString('ko-KR')} */}
            {new Date('2023-10-31 00:00:00').toLocaleString('ko-KR')}
          </Text>
          {isMine ? (
            data.isPublic ? (
              <SvgIcon name="Public" size={20}></SvgIcon>
            ) : (
              <SvgIcon name="Private" size={20}></SvgIcon>
            )
          ) : undefined}
          {isMine ? (
            <div className="flex flex-row">
              <div className="ml-3">
                <Button
                  onClick={() =>
                    window.location.replace(
                      `/user-page/${data.nickname}/edit-note/${noteId}`
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
                  onClick={() => deleteNote(parseInt(noteId))}
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
            bookmarked={50}
            quoted={50}
          ></BookmarkQuoteInfo>
        </div>

        <div data-color-mode={theme} className="w-full mx-24">
          <div className="wmde-markdown-var">
            <MarkdownPreview source={data.content} />
          </div>
        </div>
      </div>
      <div className="mx-40 mt-10 mb-4">
        <QuotationListBox theme={theme}></QuotationListBox>
      </div>
    </div>
  );
}
