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
  return (
    <div {...rest} className={`${THEME_VARIANTS[theme]} p-5 w-1/2`}>
      <div className="flex flex-row items-center">
        <Text className="ml-12">{`${nickname}`}</Text>
      </div>
      <div className="mt-2">
        <Text type="h3">{`${title}`}</Text>
      </div>
      <div className="mt-2">
        <Text type="p" className="line-clamp-2">
          {`${content}`}
        </Text>
      </div>
      <div className="mt-1 flex flex-row">
        <Text type="p" className="text-xs text-grey ">
          {`${post_time}`}
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
