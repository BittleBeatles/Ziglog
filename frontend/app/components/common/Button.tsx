'use client';
import { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color: 'charcol' | 'red' | 'blue';
  size: string;
}

const COLOR_VARIANTS = {
  charcol: 'bg-charcol',
  red: 'bg-warn',
  blue: 'bg-main-100',
};

export default function Button({ label, color, size, ...rest }: ButtonProps) {
  return (
    <button
      className={`${COLOR_VARIANTS[color]} ${size} font-bold colorClass text-white w-fit h-fit px-3 py-2 rounded-full`}
    >
      {label}
    </button>
  );
}
