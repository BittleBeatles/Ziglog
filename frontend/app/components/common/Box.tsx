import { HTMLAttributes, ReactNode } from 'react';

interface WhiteBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}

export default function Box({
  children,
  className,
  theme = 'light',
  ...rest
}: WhiteBoxProps) {
  return (
    <div
      {...rest}
      className={`${THEME_VARIANTS[theme]} w-full h-full shadow-md p-5 ${className}`}
    >
      {children}
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white text-black shadow-dark-500/50',
  dark: 'bg-dark-background-page text-white shadow-white-500/50',
};
