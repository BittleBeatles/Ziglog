import ProfileImage from '@components/common/ProfileImage';
import Text from '@components/common/Text';

interface GlobalSearchResultProps {
  note_id: number;
  title: string;
  content: string;
  nickname: string;
  is_public: 1;
  bookmark_count: number;
  post_time: string;
  theme: 'light' | 'dark';
}

export default function GlobalSearchResult({
  note_id,
  title,
  content,
  nickname,
  is_public = 1,
  bookmark_count = 10,
  post_time,
  theme,
  ...rest
}: GlobalSearchResultProps) {
  return (
    <div {...rest} className={`${THEME_VARIANTS[theme]} p-5`}>
      <div className="flex flex-row items-center">
        <ProfileImage size={40} />
        <Text className="ml-12">{'seongyong2'}</Text>
      </div>
      <div className="mt-5">
        <Text type="h3">{'노션 같은 APP 만들기'}</Text>
      </div>
      <div className="mt-2">
        <Text type="p" className="line-clamp-2">
          {
            '코드실행 결과리스트 테이블 뷰에서 항목을 선택하면 나오는 뷰를 디자인하였습니다. Table View (제약 조건을 주었습니다) Table View CellImage ViewLableButtonFile->New->Cocoa Touch Class -> Clas 이름 작성을 하여 코드실행 결과리스트 테이블 뷰에서 항목을 선택하면 나오는 뷰를 디자인하였습니다. Table View (제약 조건을 주었습니다) Table View CellImage ViewLableButtonFile->New->Cocoa Touch Class -> Clas 이름 작성을 하여'
          }
        </Text>
      </div>
      <div className="mt-1 flex flex-row">
        <Text type="p" className="text-xs text-grey ">
          {'2023년 10월 26일'}
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
