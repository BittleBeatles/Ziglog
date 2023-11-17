'use client';
import { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color: 'charcol' | 'red' | 'blue';
  onClick?: () => void;
  size?: string;
  disabled?: boolean;
}

const COLOR_VARIANTS = {
  charcol: 'bg-charcol',
  red: 'bg-warn',
  blue: 'bg-main-100',
};

export default function Button({
  label,
  color,
  onClick,
  size = '',
  disabled = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${
        COLOR_VARIANTS[color]
      } ${size} colorClass text-white w-fit h-fit px-2 py-1 rounded-full opacity-100 ${
        !disabled
          ? 'hover:opacity-60 transition-opacity duration-300'
          : 'opacity-60'
      }`}
    >
      {label}
    </button>
  );
}
