import Text from '@components/common/Text';
import { HTMLAttributes } from 'react';

interface PersonalSearchResultProps extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  title: string;
  preview: string;
  postTime: Date;
  bookmarkCount: number;
}

export default function PersonalSearchResult({
  theme,
  title,
  preview,
  postTime,
  bookmarkCount,
}: PersonalSearchResultProps) {
  const PostTime: Date = new Date(postTime);
  PostTime.setUTCHours(PostTime.getUTCHours() + 9);

  const year: number = PostTime.getFullYear();
  const month: number = PostTime.getMonth() + 1;
  const day: number = PostTime.getDate();
  const formattedDate = `${year}년 ${String(month).padStart(2, '0')}월 ${String(
    day
  ).padStart(2, '0')}일`;
  return (
    <div className={`${THEME_VARIANTS[theme]} w-fit rounded-md p-2`}>
      <div className="flex flex-row place-items-center">
        <div>
          <div className="h-4 w-1 mr-1 bg-blue-300"></div>
        </div>
        <div className="mr-2">
          <Text className="font-bold truncate max-w-noti">{title}</Text>
        </div>
        <div className="w-fit">
          <Text type="p" className="truncate">
            {preview}
          </Text>
        </div>
      </div>
      <div className="mt-1 flex flex-row">
        <Text type="p" className="text-xs text-grey ">
          {formattedDate}
        </Text>
        <Text type="p" className="ml-2 text-xs text-grey">
          {`북마크 ${bookmarkCount}`}
        </Text>
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'hover:bg-light-background-layout',
  dark: 'text-white hover:bg-charcol',
};
