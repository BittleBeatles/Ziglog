'use client';
import { useEffect, useState } from 'react';
import GlobalSearchInput from '@components/search/GlobalSearchInput';
import GlobalSearchResult from '@components/search/GlobalSearchResult';
import { SearchInfo } from '@api/search/types';
import { getSearchInfo } from '@api/search/search';

export default function Search() {
  const [keyword, setKeyword] = useState<string | null>(null);
  const [searchData, setSearchData] = useState<SearchInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      setSearchData([]);
      if (keyword) {
        try {
          const data = await getSearchInfo(keyword);
          setSearchData([data]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
    fetchData();
  }, [keyword]);

  return (
    <div className="flex flex-col justify-cneter items-center">
      <h1>검색페이지입니다.</h1>
      <div className="w-2/3">
        <GlobalSearchInput onChange={(e) => setKeyword(e.target.value)} />
        <div>
          {searchData &&
            searchData.map((result) => (
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
      </div>
    </div>
  );
}
