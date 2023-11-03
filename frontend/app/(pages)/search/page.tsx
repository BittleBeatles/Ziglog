'use client';
import { useEffect, useState } from 'react';
import GlobalSearchInput from '@components/search/GlobalSearchInput';
import GlobalSearchResult from '@components/search/GlobalSearchResult';
import useDebounce from '@src/hooks/useDebounce';
import { SearchInfo } from '@api/search/types';
import { getSearchInfo } from '@api/search/search';
import Text from '@components/common/Text';
import Link from 'next/link';
import { useScrollObserver } from '@src/hooks/useScrollObserve';

export default function Search() {
  const [keyword, setKeyword] = useState<string>('');
  const [searchData, setSearchData] = useState<SearchInfo | null>({
    notes: [],
  });
  const [page, setPage] = useState(0); // 페이지 번호
  const [loading, setLoading] = useState(false); // 데이터 로드 중인지 여부
  const [hasMore, setHasMore] = useState(true); // 더 많은 페이지가 있는지 여부
  const perPage = 5;

  // 검색 디바운싱
  const debouncedKeyword = useDebounce(keyword, 500);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (!loading && hasMore) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  //스크롤 감지 훅
  useScrollObserver(handleScroll);

  // 검색어 바뀔 때마다 초기화
  useEffect(() => {
    setPage(0);
    setSearchData({ notes: [] });
  }, [keyword]);

  useEffect(() => {
    async function fetchMoreData(debouncedKeyword: string, page: number) {
      try {
        const response = await getSearchInfo(debouncedKeyword, page, perPage);
        const newData = response;

        if (newData && newData.notes.length > 0) {
          setSearchData((prevData) => ({
            notes: [...(prevData?.notes || []), ...(newData?.notes || [])],
          }));
        } else {
          console.error('No notes data in the response.');
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
      return;
    }

    setHasMore(true);

    fetchMoreData(debouncedKeyword, page);
  }, [debouncedKeyword, page]);

  return (
    <div className="flex flex-col justify-cneter items-center">
      <div className="w-2/3">
        <GlobalSearchInput onChange={(e) => setKeyword(e.target.value)} />
        <div className="h-full overflow-y-auto">
          {searchData && searchData.notes.length > 0 ? (
            <div>
              {/* <p>총 {searchData.notes.length}개의 검색 결과가 있습니다.</p> */}
              {searchData.notes.map((result, index) => (
                <Link
                  key={index}
                  href={`/user-page/${result.nickname}/read-note/${result.noteId}`}
                >
                  <div>
                    <GlobalSearchResult
                      key={index}
                      noteId={result.noteId}
                      title={result.title}
                      preview={result.preview !== null ? result.preview : ''}
                      nickname={result.nickname}
                      isPublic={result.isPublic}
                      bookmarkCount={result.bookmarkCount}
                      postTime={result.postTime}
                      editTime={result.editTime}
                      theme="light"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            debouncedKeyword && (
              <div>
                <Text type="p">{'검색 결과가 없습니다.'}</Text>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
