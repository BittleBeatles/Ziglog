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
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-20">
          <PersonalSearchModal
            theme={theme}
            paramsNickname={paramsNickname}
            openModal={setSearchModalOpen}
            keyword={keyword}
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
