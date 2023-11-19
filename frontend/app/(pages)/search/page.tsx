'use client';
import { useEffect, useRef, useState } from 'react';
import GlobalSearchInput from '@components/search/GlobalSearchInput';
import GlobalSearchResult from '@components/search/GlobalSearchResult';
import useDebounce from '@src/hooks/useDebounce';
import { SearchInfo } from '@api/search/types';
import { getSearchInfo } from '@api/search/search';
import Text from '@components/common/Text';
import Link from 'next/link';
import { useScrollObserver } from '@src/hooks/useScrollObserve';
import { useAppSelector } from '@store/store';
import NavBar from '@components/common/NavBar';
import { useRouter } from 'next/navigation';
import SearchGraphWrapper from '@components/search/SearchGraphWrapper';

export default function Search() {
  const { theme, isLogin } = useAppSelector((state) => state.user);
  const [keyword, setKeyword] = useState<string>('');
  const [searchData, setSearchData] = useState<SearchInfo | null>({
    notes: [],
  });
  const [page, setPage] = useState(0); // 페이지 번호
  const [loading, setLoading] = useState(false); // 데이터 로드 중인지 여부
  const [hasMore, setHasMore] = useState(true); // 더 많은 페이지가 있는지 여부
  const perPage = 5;
  const router = useRouter();

  // URL 쿼리 매개변수에서 검색어 추출
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const keyword2 = urlParams.get('keyword');
  useEffect(() => {
    if (keyword2) {
      setKeyword(keyword2);
    } else {
      setKeyword('');
    }
  }, [keyword2]);

  // 검색 디바운싱
  const debouncedKeyword = useDebounce(keyword, 1000);

  const handleSearch = () => {
    // 검색 버튼을 클릭했을 때 키워드를 URL 쿼리 매개변수로 추가
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (hasMore) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  //스크롤 감지 훅
  const divRef = useRef<HTMLDivElement>(null);
  useScrollObserver(divRef, handleScroll);

  // 검색어 바뀔 때마다 초기화 (디바운싱 된 값으로)
  useEffect(() => {
    setPage(0);
    handleSearch();
    setSearchData({ notes: [] });
  }, [debouncedKeyword]);

  useEffect(() => {
    async function fetchMoreData(debouncedKeyword: string, page: number) {
      try {
        const response = await getSearchInfo(
          encodeURIComponent(debouncedKeyword),
          page,
          perPage
        );
        const newData = response;

        if (newData && newData.notes.length > 0) {
          setSearchData((prevData) => ({
            notes: [...(prevData?.notes || []), ...(newData?.notes || [])],
          }));
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching more data:', error);
      } finally {
        setLoading(false);
      }
    }

    // 검색어 없을 시 초기화 상태.
    if (!debouncedKeyword) {
      setPage(0);
      setSearchData({ notes: [] });
      setLoading(true);
    } else {
      setHasMore(true);
      fetchMoreData(debouncedKeyword, page);
    }
  }, [debouncedKeyword, page]);

  // 뒤로가기 이벤트를 감지하고 처리
  const handleGoBack = () => {
    router.push(`/`);
  };

  useEffect(() => {
    window.addEventListener('popstate', handleGoBack);
    return () => {
      window.removeEventListener('popstate', handleGoBack);
    };
  }, []);

  return (
    <div className={`${THEME_VARIANTS[theme]} h-screen`}>
      <NavBar theme={theme} isLogin={isLogin} />
      <div className="px-52 flex flex-col items-center justify-center">
        <GlobalSearchInput
          theme={theme}
          defaultValue={keyword}
          placeholder="검색어를 입력하세요"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="mt-10 w-full flex">
          <div className="w-1/2 h-full rounded-lg border border-border-grey">
            <SearchGraphWrapper theme={theme} />
          </div>

          <div
            id="sidebar-scroll"
            className="w-1/2 h-168 ml-5 overflow-y-auto"
            ref={divRef}
          >
            {searchData && searchData.notes.length > 0 ? (
              <div>
                {searchData.notes.map((result, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: `/user-page/${result.nickname}/read-note/${result.noteId}`,
                      query: { keyword: debouncedKeyword },
                    }}
                  >
                    <GlobalSearchResult
                      key={index}
                      noteId={result.noteId}
                      title={result.title}
                      preview={result.preview !== null ? result.preview : ''}
                      nickname={result.nickname}
                      profileUrl={result.profileUrl}
                      isPublic={result.isPublic}
                      bookmarkCount={result.bookmarkCount}
                      postTime={result.postTime}
                      editTime={result.editTime}
                      theme={theme}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              !loading && (
                <div>
                  <Text type="p">{'검색 결과가 없습니다.'}</Text>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: '',
  dark: 'bg-dark-background-layout text-white',
};
