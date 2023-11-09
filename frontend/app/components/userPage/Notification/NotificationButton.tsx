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
      className={`bg-zinc-300 w-fit h-fit px-5 py-0.5 rounded-full opacity-100 text-black ${
        !isSelected
          ? 'opacity-30'
          : 'hover:opacity-60 transition-opacity duration-300 border border-black '
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
