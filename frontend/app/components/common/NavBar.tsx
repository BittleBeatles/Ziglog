import { HTMLAttributes, useEffect, useState } from 'react';
import IconButton from '@components/userPage/IconButton';
import Button from '@components/common/Button';
import Text from '@components/common/Text';

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
  login: boolean;
  theme?: 'light' | 'dark';
  type?: 'lightMode' | 'darkMode';
}

export default function NavBar({
  login,
  type = 'lightMode',
  ...rest
}: NavBarProps) {
  const [theme, setTheme] = useState(type === 'lightMode' ? 'light' : 'dart');

  useEffect(() => {
    setTheme(type === 'lightMode' ? 'light' : 'dark');
  }, [type]);
  return (
    <div
      {...rest}
      className={`${THEME_VARIANTS[theme]} w-full h-full shadow-md p-5 flex items-center justify-between`}
    >
      <Text type="span" className="ml-4">
        {'ZigLog'}
      </Text>
      <div className="flex ml-auto space-x-4 items-center">
        {login ? (
          <>
            <IconButton
              name={type === 'lightMode' ? 'lightMode' : 'darkMode'}
            />
            <IconButton name="myPage" />
            <IconButton name="search" />
            <Button label="로그아웃" color="charcol" />
          </>
        ) : (
          <>
            <IconButton
              name={type === 'lightMode' ? 'lightMode' : 'darkMode'}
            />
            <IconButton name="search" />
            <Button label="로그인" color="charcol" />
          </>
        )}
      </div>
    </div>
  );
}

const THEME_VARIANTS: { [key: string]: string } = {
  light: 'bg-white text-black shadow-dark-500/50',
  dark: 'bg-dark-background-page text-white shadow-white-500/50',
};
