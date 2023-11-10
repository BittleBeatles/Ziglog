'use client';
import { useAppSelector } from '@store/store';
import SvgIcon from './SvgIcon';

export default function GraphLoading() {
  const theme = useAppSelector((state) => state.user.theme);
  return (
    <div
      className={`w-screen h-screen flex justify-center items-center ${
        theme === 'dark' ? 'bg-dark-background-layout' : ''
      }`}
    >
      <SvgIcon name="Loading" size={150} />
    </div>
  );
}
