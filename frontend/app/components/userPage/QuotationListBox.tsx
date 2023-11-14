'use client';
import Text from '@components/common/Text';
import SvgIcon from '@components/common/SvgIcon';
import IconButton from '@components/common/IconButton';
import { useState } from 'react';
import colors from '@src/design/color';
import { quoteNote } from '@api/quote/types';
import { useRouter } from 'next/navigation';
import { showAlert } from '@src/util/alert';

interface QuotationListBoxProps {
  theme: 'dark' | 'light';
  quotationList: quoteNote[];
  label: string;
  userNickname: string;
}

const TEXT_COLOR = {
  dark: 'text-white',
  light: 'text-black',
};

export default function QuotationListBox({
  theme,
  quotationList,
  label,
  userNickname,
}: QuotationListBoxProps) {
  const [showList, setShowList] = useState(true);
  const router = useRouter();
  return (
    <div
      className={`${THEME_VARIANTS[theme]} relative rounded-md p-5 flex flex-col gap-4 w-full`}
    >
      {/* 북마크 아이콘  */}
      <div className="absolute -top-3 right-20">
        <SvgIcon name="BookMarkFill" color={colors['main-100']} size={70} />
      </div>
      {/* 제목 */}
      <Text type="h3">{label}</Text>
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

      {showList && (
        <ul className="flex flex-col gap-1 ml-2">
          {quotationList.length > 0 ? (
            quotationList.map((item) => {
              return (
                <span
                  className="cursor-pointer"
                  key={item.noteId}
                  onClick={() => {
                    if (item.isPublic || userNickname === item.nickname) {
                      router.push(
                        `/user-page/${item.nickname}/read-note/${item.noteId}`
                      );
                    } else {
                      showAlert('비공개 글 입니다.', 'info');
                    }
                  }}
                >
                  <span className="flex flex-row gap-1 items-center">
                    <Text
                      type="p"
                      className={`${TEXT_COLOR[theme]}`}
                      key={item.noteId}
                    >
                      {item.nickname} : {item.title}
                    </Text>
                    {!item.isPublic && (
                      <SvgIcon
                        name="Private"
                        size={20}
                        color={theme === 'dark' ? 'white' : 'black'}
                      />
                    )}
                  </span>
                </span>
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
