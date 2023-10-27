import GlobalSearchInput from '@components/search/GlobalSearchInput';
import GlobalSearchResult from '@components/search/GlobalSearchResult';

export default function Search() {
  return (
    <div className="flex flex-col justify-cneter items-center">
      <h1>검색페이지입니다.</h1>
      <div className="w-2/3">
        <GlobalSearchInput />
        <GlobalSearchResult
          noteId={1}
          title="안녕하세요"
          preview="코드실행 결과리스트 테이블 뷰에서 항목을 선택하면 나오는 뷰를 디자인하였습니다. Table View (제약 조건을 주었습니다) Table View CellImage ViewLableButtonFile->New->Cocoa Touch Class -> Clas 이름 작성을 하여 코드실행 결과리스트 테이블 뷰에서 항목을 선택하면 나오는 뷰를 디자인하였습니다. Table View (제약 조건을 주었습니다) Table View CellImage ViewLableButtonFile->New->Cocoa Touch Class -> Clas 이름 작성을 하여"
          nickname="markLee"
          isPublic={true}
          bookmarkCount={82}
          postTime="2023-10-26 12:23"
          editTime={null}
          theme="light"
        ></GlobalSearchResult>
      </div>
    </div>
  );
}
