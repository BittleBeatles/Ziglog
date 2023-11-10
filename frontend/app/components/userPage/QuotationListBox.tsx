'use client';
import Text from '@components/common/Text';
import SvgIcon from '@components/common/SvgIcon';
import IconButton from '@components/common/IconButton';
import { useState } from 'react';
import colors from '@src/design/color';
import Link from 'next/link';
import { NoteRefListInfo } from '@api/note/types';

interface QuotationListBoxProps extends NoteRefListInfo {
  theme: 'dark' | 'light';
}

const TEXT_COLOR = {
  dark: 'text-white',
  light: 'text-black',
};

export default function QuotationListBox({
  theme,
  quotationList,
}: QuotationListBoxProps) {
  const [showList, setShowList] = useState(true);
  return (
    <div
      className={`${THEME_VARIANTS[theme]} relative rounded-md p-5 flex flex-col gap-4`}
    >
      {/* 북마크 아이콘  */}
      <div className="absolute -top-3 right-24">
        <SvgIcon name="BookMarkFill" color={colors['main-100']} size={70} />
      </div>
      {/* 제목 */}
      <Text type="h3">이 글을 참조한 글 목록</Text>
      {/* 목록 보기 */}
      <div className="flex flex-row gap-1 items-center">
        <IconButton
          onClick={() => setShowList(!showList)}
          name={showList ? 'ArrowDown' : 'ArrowUp'}
          size={40}
          theme={theme}
        />
        <Text>목록 보기</Text>
      </div>
      {/* 목록 - 추후에 onClick 이벤트 추가하기*/}
      {showList && (
        <ul className="flex flex-col gap-1 ml-2">
          {quotationList.length > 0 ? (
            quotationList.map((item) => {
              return (
                <Link
                  href={`/user-page/${item.nickname}/read-note/${item.noteId}`}
                  key={item.noteId}
                >
                  <Text
                    type="p"
                    className={`${TEXT_COLOR[theme]}`}
                    key={item.noteId}
                  >
                    {item.nickname} : {item.title}
                  </Text>
                </Link>
              );
            })
          ) : (
            <Text>이 글을 참조한 노트들이 없습니다.</Text>
          )}
        </ul>
      )}
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout text-black',
  dark: 'bg-dark-background-layout text-white',
};
