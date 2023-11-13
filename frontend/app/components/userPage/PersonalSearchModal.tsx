import { HTMLAttributes, useEffect, useState } from 'react';
import PersonalSearchResult from './Search/PersonalSearchResult';
import Link from 'next/link';
import { SearchInfo } from '@api/search/types';
import IconButton from '@components/common/IconButton';

interface PersonalSearchModalProps extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  nickname: string;
  openModal: (open: boolean) => void;
  searchData: SearchInfo | null;
  setKeyword: (keyword: string) => void;
}

export default function PersonalSearchModal({
  theme,
  nickname,
  openModal,
  searchData,
  setKeyword,
}: PersonalSearchModalProps) {
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
                    pathname: `/user-page/${nickname}/read-note/${searchResult.noteId}`,
                  }}
                >
                  <PersonalSearchResult
                    key={index}
                    theme={theme}
                    title={searchResult.title}
                    preview={searchResult.preview}
                    postTime={searchResult.postTime}
                    bookmarkCount={searchResult.bookmarkCount}
                  ></PersonalSearchResult>
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
