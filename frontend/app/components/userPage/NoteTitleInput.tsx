'use client';
import React, { Dispatch, SetStateAction, forwardRef } from 'react';
import { InputHTMLAttributes } from 'react';

interface NoteTitleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: 'light' | 'dark';
}

const NoteTitleInput = forwardRef<HTMLInputElement, NoteTitleInputProps>(
  ({ theme, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-5/6 outline-none text-3xl font-bold ${
          theme === 'light' ? 'bg-white' : 'bg-dark-background-page text=white'
        }`}
        {...rest}
        type="text"
      />
    );
  }
);

export default NoteTitleInput;
