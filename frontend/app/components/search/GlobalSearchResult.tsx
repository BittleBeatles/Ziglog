import ProfileImage from '@components/common/ProfileImage';
import Text from '@components/common/Text';

interface GlobalSearchResultProps {
  noteId: number;
  title: string;
  preview: string;
  nickname: string;
  isPublic: boolean;
  bookmarkCount: number;
  postTime: Date;
  editTime: Date | null;
  theme: 'light' | 'dark';
}

export default function GlobalSearchResult({
  noteId,
  title,
  preview,
  nickname,
  isPublic,
  bookmarkCount,
  postTime,
  editTime,
  theme,
  ...rest
}: GlobalSearchResultProps) {
  if (!isPublic) {
    return null;
  }
  const PostTime: Date = new Date(editTime || postTime);
  PostTime.setUTCHours(PostTime.getUTCHours() + 9);

  const year: number = PostTime.getFullYear();
  const month: number = PostTime.getMonth() + 1;
  const day: number = PostTime.getDate();
  const formattedDate = `${year}년 ${String(month).padStart(2, '0')}월 ${String(
    day
  ).padStart(2, '0')}일`;

  return (
    <div {...rest} className={`${THEME_VARIANTS[theme]} p-5 mt-3`}>
      <div className="flex flex-row items-center">
        <ProfileImage size={40} />
        <Text className="ml-4">{`${nickname}`}</Text>
      </div>
      <div className="mt-3">
        <Text type="h3">{`${title}`}</Text>
      </div>
      <div className="mt-2">
        <Text type="p" className="line-clamp-3">
          {`${preview}`}
        </Text>
      </div>
      <div className="mt-2 flex flex-row">
        <Text type="p" className="text-xs text-grey ">
          {`${formattedDate}`}
        </Text>
        <Text type="p" className="ml-2 text-xs text-grey">
          {`북마크 ${bookmarkCount}`}
        </Text>
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: '',
  dark: 'text-white',
};
