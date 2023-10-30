'use client';
import React, { forwardRef } from 'react';
import { InputHTMLAttributes } from 'react';

interface NoteTitleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: 'light' | 'dark';
  noteTitle: string;
}

export default function NoteTitleInput({
  theme,
  noteTitle,
  ...rest
}: NoteTitleInputProps) {
  return (
    <input
      className={`w-fit outline-none text-3xl font-bold ${
        theme === 'light' ? 'bg-white' : 'bg-dark-background-page text=white'
      }`}
      defaultValue={noteTitle}
      {...rest}
      type="text"
    />
  );
}
