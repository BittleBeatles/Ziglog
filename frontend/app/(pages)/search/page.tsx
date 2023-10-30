'use client';
import { useEffect, useState } from 'react';
import { API_URL } from '@api/constants';
import GlobalSearchInput from '@components/search/GlobalSearchInput';
import GlobalSearchResult from '@components/search/GlobalSearchResult';

export interface Search {
  noteId: number;
  title: string;
  content: string;
  nickname: string;
  isPublic: boolean;
  bookmarkCount: number;
  postTime: string;
  editTime: string | null;
}

export default function Search() {
  const [searchData, setSearchData] = useState<Search[]>([]);
  const [keyword, setKeyword] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = (
        await fetch(`${API_URL}/api/search?keyword=${keyword}`)
      ).then((res) => res.json());
      setSearchData(data.data);
    }
    fetchData();
  }, [keyword]);

  return (
    <div className="flex flex-col justify-cneter items-center">
      <h1>검색페이지입니다.</h1>
      <div className="w-2/3">
        <GlobalSearchInput onChange={(e) => setKeyword(e.target.value)} />
        <div>
          {searchData.map((result) => (
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
