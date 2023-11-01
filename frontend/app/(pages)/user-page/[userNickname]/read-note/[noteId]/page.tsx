'use client';
import { useParams } from 'next/navigation';
import Text from '@components/common/Text';
import SvgIcon from '@components/common/SvgIcon';
import Button from '@components/common/Button';
import BookmarkQuoteInfo from '@components/userPage/BookmarkQuoteInfo';
import MDEditor from '@uiw/react-md-editor';
import QuotationListBox from '@components/userPage/QuotationListBox';
import { NoteInfo } from '@api/note/types';
import { deleteNote, getNoteInfo } from '@api/note/note';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/store';

export default function ReadNote() {
  const { theme, isLogin } = useAppSelector((state) => state.user);

  const params = useParams();
  const noteId = params.noteId as string;
  const value = '';
  // const value = `# What is Lorem Ipsum?
  // Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

  // # Why do we use it?
  // It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

  // # Where does it come from?
  // Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  // The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

  // # Where can I get some?
  // There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`;
  const [data, setData] = useState<NoteInfo>({
    noteId: 1,
    title: '글제목',
    content: value,
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
        console.log(result);
        console.log('success');
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
    <div className="overflow-y-auto h-full">
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
                <Button color="blue" label="수정" size="text-xs"></Button>
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
          <div className="wmde-markdown-var"> </div>{' '}
          {/* dark mode에서 색을 바꿔줘야 할 필요가 있습니다... */}
          <MDEditor.Markdown source={data.content} />
        </div>
      </div>
      <div className="mx-40 mt-10 mb-4">
        <QuotationListBox theme={theme}></QuotationListBox>
      </div>
    </div>
  );
}
