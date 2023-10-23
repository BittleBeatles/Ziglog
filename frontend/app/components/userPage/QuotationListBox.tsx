'use client';
import Text from '@components/common/Text';
import SvgIcon from '@components/common/SvgIcon';
import { useState } from 'react';
import colors from '@src/design/color';

interface QuotationListBoxProps {
  theme: 'dark' | 'light';
  quotationList?: [userNickname: string, noteTitle: string, noteId: number];
}

const ICON_COLOR = {
  dark: 'white',
  light: 'black',
};

export default function QuotationListBox({ theme }: QuotationListBoxProps) {
  const [showList, setShowList] = useState(false);
  const quotationList = [
    {
      userNickname: 'frog_slayer',
      noteTitle: '[Spring Security](1) 기본 구성',
      noteId: 1,
    },
    {
      userNickname: 'frog_slayer',
      noteTitle: '[Spring Security](2) 인증 구현',
      noteId: 2,
    },
  ];
  return (
    <div
      className={`${THEME_VARIANTS[theme]} relative rounded-md h-72 p-5 flex flex-col gap-5`}
    >
      {/* 북마크 아이콘  */}
      <div className="absolute -top-2 right-24">
        <SvgIcon name="BookMarkFill" color={colors['main-100']} size={70} />
      </div>
      {/* 제목 */}
      <Text type="h3">이 글을 참조한 글 목록</Text>
      {/* 목록 보기 */}
      <div className="flex flex-row gap-3">
        {!showList ? (
          <span onClick={() => setShowList(!showList)}>
            <SvgIcon name="ArrowDown" color={ICON_COLOR[theme]} />
          </span>
        ) : (
          <span onClick={() => setShowList(!showList)}>
            <SvgIcon name="ArrowUp" color={ICON_COLOR[theme]} />
          </span>
        )}
        <Text>목록 보기</Text>
      </div>
      {/* 목록 - 추후에 onClick 이벤트 추가하기*/}
      <div className="flex flex-col gap-1">
        {quotationList?.map((item) => {
          console.log(item);
          return (
            <div className="text-white" key={item.noteId}>
              <Text type="p">
                {item.userNickname} : {item.noteTitle}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout text-black',
  dark: 'bg-dark-background-layout text-white',
};
