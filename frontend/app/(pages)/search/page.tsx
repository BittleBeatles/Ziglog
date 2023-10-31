'use client';
import { useEffect, useState, useRef } from 'react';
import GlobalSearchInput from '@components/search/GlobalSearchInput';
import GlobalSearchResult from '@components/search/GlobalSearchResult';
import useDebounce from '@src/hooks/useDebounce';
import { SearchResult } from '@api/search/types';
import { getSearchInfo } from '@api/search/search';
import Text from '@components/common/Text';

export default function Search() {
  const [keyword, setKeyword] = useState<string>('');
  const [searchData, setSearchData] = useState<{
    data: { notes: SearchResult[] };
  } | null>(null);
  const [page, setPage] = useState(1); // 페이지 번호
  const [loading, setLoading] = useState(false); // 데이터 로드 중인지 여부
  const [hasMore, setHasMore] = useState(true); // 더 많은 페이지가 있는지 여부
  const containerRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 ref
  const perPage = 10;

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
    async function fetchMoreData(debouncedKeyword: string) {
      try {
        const response = await getSearchInfo(debouncedKeyword, page, perPage);
        const newData = response.data;

        if (newData && newData.notes.length > 0) {
          setSearchData((prevData) => ({
            data: {
              notes: [...(prevData?.data?.notes || []), ...newData.notes],
            },
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

    if (!debouncedKeyword) {
      return;
    }

    if (page === 1) {
      setSearchData({ data: { notes: [] } });
    }

    if (debouncedKeyword) {
      fetchMoreData(debouncedKeyword);
    }
  }, [debouncedKeyword, page]);

  // // fetchMoreData 함수를 블록 외부에서 선언
  // async function fetchMoreData(debouncedKeyword: string) {
  //   try {
  //     const response = await getSearchInfo(debouncedKeyword, page, perPage);
  //     const newData = response.data;

  //     if (newData && newData.notes.length > 0) {
  //       setSearchData((prevData) => ({
  //         data: {
  //           notes: [...(prevData?.data?.notes || []), ...newData.notes],
  //         },
  //       }));
  //     } else {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching more data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // // 스크롤 이벤트 핸들러
  // const handleScroll = () => {
  //   if (
  //     containerRef.current &&
  //     containerRef.current.scrollHeight - containerRef.current.scrollTop ===
  //       containerRef.current.clientHeight
  //   ) {
  //     if (!loading && hasMore) {
  //       setLoading(true);
  //       setPage(page + 1);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // 입력 없을 시.
  //   if (!debouncedKeyword) {
  //     return;
  //   }

  //   if (page === 1) {
  //     setSearchData({ data: { notes: [] } });
  //   }

  //   if (debouncedKeyword) {
  //     // 함수 호출로 변경
  //     fetchMoreData(debouncedKeyword);
  //   }
  // }, [debouncedKeyword, page, fetchMoreData]);

  return (
    <div className="flex flex-col justify-cneter items-center">
      <h1>검색페이지입니다.</h1>
      <div className="w-2/3">
        <GlobalSearchInput onChange={(e) => setKeyword(e.target.value)} />
        <div className="h-full " onScroll={handleScroll} ref={containerRef}>
          {searchData && searchData.data.notes.length > 0
            ? searchData.data.notes.map((result) => (
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
              ))
            : debouncedKeyword && (
                <div>
                  <Text type="p">{'검색 결과가 없습니다.'}</Text>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
