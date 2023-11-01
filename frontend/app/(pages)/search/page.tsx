'use client';
import { useEffect, useState, useRef } from 'react';
import GlobalSearchInput from '@components/search/GlobalSearchInput';
import GlobalSearchResult from '@components/search/GlobalSearchResult';
import useDebounce from '@src/hooks/useDebounce';
import { SearchInfo } from '@api/search/types';
import { getSearchInfo } from '@api/search/search';
import Text from '@components/common/Text';

export default function Search() {
  const [keyword, setKeyword] = useState<string>('');
  const [searchData, setSearchData] = useState<SearchInfo | null>({
    notes: [],
  });
  const [page, setPage] = useState(0); // 페이지 번호
  const [loading, setLoading] = useState(false); // 데이터 로드 중인지 여부
  const [hasMore, setHasMore] = useState(true); // 더 많은 페이지가 있는지 여부
  const containerRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 ref
  const perPage = 5;

  const debouncedKeyword = useDebounce(keyword, 500);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollHeight - containerRef.current.scrollTop ===
        containerRef.current.clientHeight
    ) {
      if (!loading && hasMore) {
        setLoading(true);
        setPage(page + 1);
      }
    }
  };

  useEffect(() => {
    async function fetchMoreData(debouncedKeyword: string, page: number) {
      try {
        console.log(debouncedKeyword, page, perPage);
        const response = await getSearchInfo(debouncedKeyword, page, perPage);
        const newData = response;
        console.log('검색 결과 데이터:', newData);
        console.log('객체 개수:', newData.notes.length);

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

    if (!debouncedKeyword) {
      return;
    }

    if (page === 0) {
      setSearchData({ notes: [] });
    }

    if (debouncedKeyword) {
      fetchMoreData(debouncedKeyword, page);
    }
  }, [debouncedKeyword, page]);

  return (
    <div className="flex flex-col justify-cneter items-center">
      <h1>검색페이지입니다.</h1>
      <div className="w-2/3">
        <GlobalSearchInput onChange={(e) => setKeyword(e.target.value)} />
        <div className="h-full " onScroll={handleScroll} ref={containerRef}>
          {searchData && searchData.notes.length > 0 ? (
            <div>
              <p>총 {searchData.notes.length}개의 검색 결과가 있습니다.</p>
              {searchData.notes.map((result) => (
                <GlobalSearchResult
                  key={result.noteId}
                  noteId={result.noteId}
                  title={result.title}
                  preview={result.preview}
                  nickname={result.nickname}
                  isPublic={result.isPublic}
                  bookmarkCount={result.bookmarkCount}
                  postTime={result.postTime}
                  editTime={result.editTime}
                  theme="light"
                />
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
