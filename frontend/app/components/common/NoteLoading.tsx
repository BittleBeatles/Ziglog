'use client';

import { useAppSelector } from '@store/store';

// interface NoteLoadingProps {
//   theme: 'light' | 'dark';
// }

export default function NoteLoading() {
  const theme = useAppSelector((state) => state.user.theme);
  return (
    <div className="animate-pulse space-y-5 w-full px-32 py-10">
      <div className={`${THEME_VARIANTS[theme]} h-20 rounded w-3/4`} />
      <div className={`${THEME_VARIANTS[theme]} h-120 rounded`} />
      <div className={`${THEME_VARIANTS[theme]} h-24 rounded`} />
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-layout',
};
