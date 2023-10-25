import ProfileImage from '@components/common/ProfileImage';
import Text from '@components/common/Text';

interface GlobalSearchResultProps {
  note_id: number;
  title: string;
  content: string;
  nickname: string;
  is_public: 1;
  bookmark_count: number;
  saved_time: string;
  theme: 'light' | 'dark';
}

export default function GlobalSearchResult({
  note_id,
  title,
  content,
  nickname,
  is_public = 1,
  bookmark_count,
  saved_time,
  theme,
  ...rest
}: GlobalSearchResultProps) {
  return (
    <div {...rest} className={`${THEME_VARIANTS[theme]}`}>
      <div className="flex items-center">
        <ProfileImage size={40} />
        <Text>{'seongyong2'}</Text>
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: '',
  dark: 'bg-dark-background-layout text-white',
};
