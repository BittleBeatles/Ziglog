'use client';
import { ButtonHTMLAttributes } from 'react';
interface NotificationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function NotificationButton({
  label,
  onClick,
  isSelected = false,
  ...rest
}: NotificationButtonProps) {
  return (
    <button
      {...rest}
      className={`bg-zinc-300 text-black w-fit h-fit px-5 py-1 rounded-full opacity-100 ${
        !isSelected
          ? 'opacity-60'
          : 'hover:opacity-60 transition-opacity duration-300 border border-black '
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
