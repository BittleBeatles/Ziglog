'use client';
import { useParams } from 'next/navigation';
import Text from '@components/common/Text';
import SvgIcon from '@components/common/SvgIcon';
import Button from '@components/common/Button';
import BookmarkQuoteInfo from '@components/userPage/BookmarkQuoteInfo';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReadNote() {
  const isMine = true;
  const params = useParams();
  return (
    <div>
      <div className="mx-40 my-12">
        <Text type="h1">{'안녕하세요'}</Text>
        <div className="flex flex-row place-items-center my-4">
          <Text type="b">{'frog_slayer'}</Text>
          <Text className="mx-3" type="p">
            {'2023.10.30'}
          </Text>
          <SvgIcon name="Private" size={20}></SvgIcon>
          {isMine ? (
            <div className="flex flex-row">
              <div className="ml-3">
                <Button color="blue" label="수정" size="text-xs"></Button>
              </div>
              <div className="ml-3">
                <Button color="red" label="삭제" size="text-xs"></Button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex flex-row mx-20">
        <div className="mr-6">
          <BookmarkQuoteInfo bookmarked={50} quoted={50}></BookmarkQuoteInfo>
        </div>
        <div>
          <Markdown remarkPlugins={[remarkGfm]}>
            {'# Hi, *Pluto*! ~안녕하세요~'}
          </Markdown>
          <Text type="b">{'hey'}</Text>
          <h1>{params.userNickname}의</h1>
          <h1>{params.noteId}번째</h1>
          <h1>글 읽기 페이지입니다</h1>
        </div>
      </div>
    </div>
  );
}
