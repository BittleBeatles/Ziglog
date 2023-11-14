import { HTMLAttributes, useEffect, useState } from 'react';
import PersonalSearchResult from './Search/PersonalSearchResult';
import Link from 'next/link';
import { SearchInfo } from '@api/search/types';
import IconButton from '@components/common/IconButton';
import { getPersonalSearchInfo } from '@api/search/search';
import { useScroll } from '@src/hooks/useScroll';

interface PersonalSearchModalProps extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  paramsNickname: string;
  openModal: (open: boolean) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export default function PersonalSearchModal({
  theme,
  paramsNickname,
  openModal,
  keyword,
  setKeyword,
}: PersonalSearchModalProps) {
  const [searchData, setSearchData] = useState<SearchInfo | null>({
    notes: [],
  });
  const [page, setPage] = useState(0); // 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 많은 페이지가 있는지 여부
  const perPage = 8;

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  //스크롤 감지 훅
  useScroll(handleScroll);

  useEffect(() => {
    async function fetchMoreData(keyword: string, page: number) {
      try {
        const response = await getPersonalSearchInfo(
          encodeURIComponent(keyword),
          encodeURIComponent(paramsNickname),
          page,
          perPage
        );
        const newData = response;

        if (newData && newData.notes.length > 0) {
          setSearchData((prevData) => ({
            notes:
              prevData?.notes.length == newData?.notes.length
                ? newData?.notes || []
                : [...(prevData?.notes || []), ...(newData?.notes || [])],
          }));
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching more data:', error);
      } finally {
      }
    }

    setHasMore(true);
    fetchMoreData(keyword, page);
  }, [keyword, page]);
  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-132 shadow-md border text-center rounded-md justify-center px-3`}
    >
      {searchData && searchData.notes.length > 0 ? (
        <div>
          <div className="grid justify-items-end mt-3">
            <IconButton
              onClick={() => {
                openModal(false);
                setKeyword('');
              }}
              theme={theme}
              name="Close"
            />
          </div>
          <div id="sidebar-scroll" className="h-96 overflow-y-auto mb-3">
            {searchData.notes.map((searchResult, index) => (
              <div
                key={index}
                onClick={() => {
                  openModal(false);
                  setKeyword('');
                }}
              >
                <Link
                  key={index}
                  href={{
                    pathname: `/user-page/${paramsNickname}/read-note/${searchResult.noteId}`,
                  }}
                >
                  <PersonalSearchResult
                    key={index}
                    theme={theme}
                    title={searchResult.title}
                    preview={searchResult.preview}
                    postTime={searchResult.postTime}
                    bookmarkCount={searchResult.bookmarkCount}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-96 my-3">
          <div className="grid justify-items-end">
            <IconButton
              onClick={() => openModal(false)}
              theme={theme}
              name="Close"
            />
          </div>
          <p>검색 결과가 없습니다</p>
        </div>
      )}
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white',
  dark: 'bg-dark-background-page text-white',
};
