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
  isSelected,
  ...rest
}: NotificationButtonProps) {
  return (
    <button
      {...rest}
      className={`bg-neutral-300 w-fit h-fit px-5 py-0.5 rounded-full opacity-100 text-black ${
        !isSelected ? 'opacity-30' : 'opacity-100 transition-opacity'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
