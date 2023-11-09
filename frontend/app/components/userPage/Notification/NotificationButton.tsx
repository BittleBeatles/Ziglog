'use client';
import { ButtonHTMLAttributes } from 'react';
interface NotificationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function NotificationButton({
  label,
  onClick,
  disabled = false,
  ...rest
}: NotificationButtonProps) {
  return (
    <button
      className={`colorClass text-black w-fit h-fit px-2 py-1 rounded-full opacity-100 ${
        !disabled
          ? 'hover:opacity-60 transition-opacity duration-300'
          : 'opacity-60'
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
