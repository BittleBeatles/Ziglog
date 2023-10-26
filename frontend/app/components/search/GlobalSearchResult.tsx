import ProfileImage from '@components/common/ProfileImage';
import Text from '@components/common/Text';

interface GlobalSearchResultProps {
  note_id: number;
  title: string;
  content: string;
  nickname: string;
  is_public: boolean;
  bookmark_count: number;
  post_time: string;
  theme: 'light' | 'dark';
}

export default function GlobalSearchResult({
  note_id,
  title,
  content,
  nickname,
  is_public,
  bookmark_count,
  post_time,
  theme,
  ...rest
}: GlobalSearchResultProps) {
  if (!is_public) {
    return null;
  }
  const postTime: Date = new Date(post_time);
  const year: number = postTime.getFullYear();
  const month: number = postTime.getMonth() + 1;
  const day: number = postTime.getDate();
  const formattedDate: string = `${year}년 ${String(month).padStart(
    2,
    '0'
  )}월 ${String(day).padStart(2, '0')}일`;

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
          {`${content}`}
        </Text>
      </div>
      <div className="mt-2 flex flex-row">
        <Text type="p" className="text-xs text-grey ">
          {`${formattedDate}`}
        </Text>
        <Text type="p" className="ml-2 text-xs text-grey">
          {`북마크 ${bookmark_count}`}
        </Text>
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: '',
  dark: 'bg-dark-background-layout text-white',
};
