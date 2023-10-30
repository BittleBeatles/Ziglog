import GlobalSearchInput from '@components/search/GlobalSearchInput';
import GlobalSearchResult from '@components/search/GlobalSearchResult';

export default function Search() {
  const searchData = {
    statusCode: 200,
    message: 'success',
    data: [
      {
        noteId: 1,
        title: 'hiyo',
        content: 'Header',
        nickname: 'hanul',
        isPublic: true,
        bookmarkCount: 100,
        postTime: '2023-09-29 12:34',
        editTime: null,
      },
      {
        noteId: 5,
        title: 'hiyooo',
        content: '지그로그 많이 이용해주세요. 정말 재밌거든요.',
        nickname: 'hyeona',
        isPublic: true,
        bookmarkCount: 80,
        postTime: '2023-10-29 12:34',
        editTime: '2023-10-29 22:34',
      },
    ],
  };

  return (
    <div className="flex flex-col justify-cneter items-center">
      <h1>검색페이지입니다.</h1>
      <div className="w-2/3">
        <GlobalSearchInput />
        <div>
          {searchData.data.map((result) => (
            <GlobalSearchResult
              key={result.noteId}
              noteId={result.noteId}
              title={result.title}
              preview={result.content}
              nickname={result.nickname}
              isPublic={result.isPublic}
              bookmarkCount={result.bookmarkCount}
              postTime={result.postTime}
              editTime={result.editTime}
              theme="light"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
