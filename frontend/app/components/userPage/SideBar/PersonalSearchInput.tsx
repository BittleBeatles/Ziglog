'use client';
import React, { forwardRef, useEffect, useState } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import { InputHTMLAttributes } from 'react';
import colors from '@src/design/color';
import { useParams, useRouter } from 'next/navigation';
import PersonalSearchModal from '../PersonalSearchModal';
import { useScrollObserver } from '@src/hooks/useScrollObserve';
import { getPersonalSearchInfo } from '@api/search/search';
import { SearchInfo } from '@api/search/types';

interface PersonalSearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  paramsNickname: string;
}
interface THEME_FOCUSED {
  isFocused: boolean;
  theme: 'light' | 'dark';
}

const PersonalSearchInput = forwardRef<
  HTMLInputElement,
  PersonalSearchInputProps
>(({ theme = 'light', paramsNickname, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  function getThemeVariant({ isFocused, theme }: THEME_FOCUSED) {
    if (isFocused && theme === 'light') return THEME_VARIANTS.focusLight;
    if (isFocused && theme === 'dark') return THEME_VARIANTS.focusDark;
    return THEME_VARIANTS[theme];
  }

  const params = useParams();
  const nickname = decodeURIComponent(params.userNickname as string);

  const themeClass = getThemeVariant({ isFocused, theme });

  const [keyword, setKeyword] = useState('');
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchIconClick();
    }
  };

  const handleSearchIconClick = () => {
    // 모달 열기
    openSearchModal(true);
  };

  const openSearchModal = (open: boolean) => {
    setSearchModalOpen(true);
  };

  const [searchData, setSearchData] = useState<SearchInfo | null>({
    notes: [],
  });
  const [page, setPage] = useState(0); // 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 많은 페이지가 있는지 여부
  const perPage = 5;

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  //스크롤 감지 훅
  useScrollObserver(handleScroll);

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
          setSearchData({
            notes: newData?.notes,
          });
        } else {
          console.error('No notes data in the response.');
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching more data:', error);
      } finally {
      }
    }

    // 검색어 없을 시 초기화 상태.
    if (!keyword) {
      setPage(0);
      setSearchData({ notes: [] });
    } else {
      setHasMore(true);
      fetchMoreData(keyword, page);
    }
  }, [keyword, page]);

  return (
    <div
      className={`
        w-full h-10 p-2 text-md rounded-xl flex items-center 
        ${themeClass}
        `}
    >
      <div className="mr-2">
        <SvgIcon
          name="Search"
          size={24}
          color={theme === 'light' ? colors.grey : colors.white}
          onClick={handleSearchIconClick}
        />
      </div>
      <input
        className={`w-full outline-none ${
          theme === 'light' ? 'bg-white' : 'bg-dark-background-page'
        }`}
        ref={ref}
        {...rest}
        type="text"
        value={keyword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
      {isSearchModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <PersonalSearchModal
            theme={theme}
            keyword={keyword}
            nickname={nickname}
            openModal={setSearchModalOpen}
            searchData={searchData}
            setKeyword={setKeyword}
          ></PersonalSearchModal>
        </div>
      )}
    </div>
  );
});

const THEME_VARIANTS = {
  light: 'bg-white text-black border border-border-grey',
  dark: 'bg-dark-background-page text-white border border-black',
  focusLight: 'bg-white text-black border border-grey',
  focusDark: 'bg-dark-background-page text-white border border-white-300',
};

export default PersonalSearchInput;
