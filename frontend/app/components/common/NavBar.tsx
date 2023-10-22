import { HTMLAttributes } from 'react';
import IconButton from '@components/userPage/IconButton';
import Button from '@components/common/Button';

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
  login: boolean;
  theme?: 'light' | 'dark';
  type: 'lightMode' | 'darkMode';
}

export default function NavBar({
  login,
  theme = 'light',
  type = 'lightMode',
  ...rest
}: NavBarProps) {
  return (
    <div
      {...rest}
      className={`${THEME_VARIANTS[theme]} w-full h-full shadow-md p-5`}
    >
      {login ? (
        <>
          <IconButton name={type === 'lightMode' ? 'lightMode' : 'darkMode'} />
          <IconButton name="myPage" />
          <IconButton name="search" />
          <Button label="로그아웃" color="charcol" />
        </>
      ) : (
        <>
          <IconButton name={type === 'lightMode' ? 'lightMode' : 'darkMode'} />
          <IconButton name="search" />
          <Button label="로그인" color="charcol" />
        </>
      )}
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white text-black shadow-dark-500/50',
  dark: 'bg-dark-background-page text-white shadow-white-500/50',
};
