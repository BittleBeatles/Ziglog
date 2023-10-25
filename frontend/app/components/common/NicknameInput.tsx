import { InputHTMLAttributes } from 'react';

interface NicknameInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  nickname?: string;
}

export default function NicknameInput({
  theme = 'light',
  nickname = '닉네임',
  ...rest
}: NicknameInputProps) {
  return (
    <input
      {...rest}
      type="text"
      defaultValue={nickname}
      className={`${THEME_VARIANTS[theme]}  w-72 h-12 p-2 text-base rounded `}
    />
  );
}

const THEME_VARIANTS = {
  light: 'bg-input-grey border border-input-grey',
  dark: 'bg-input-grey border border-input-grey text-black',
};
