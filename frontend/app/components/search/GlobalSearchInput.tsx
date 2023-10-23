'use client';
import React, { forwardRef, useState } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import { InputHTMLAttributes } from 'react';
import colors from '@src/design/color';

interface GlobalSearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
}
interface THEME_FOCUSED {
  isFocused: boolean;
  theme: 'light' | 'dark';
}

const GlobalSearchInput = forwardRef<HTMLInputElement, GlobalSearchInputProps>(
  ({ theme = 'light', ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    function getThemeVariant({ isFocused, theme }: THEME_FOCUSED) {
      if (isFocused && theme === 'light') return THEME_VARIANTS.focusLight;
      if (isFocused && theme === 'dark') return THEME_VARIANTS.focusDark;
      return THEME_VARIANTS[theme];
    }

    const themeClass = getThemeVariant({ isFocused, theme });

    return (
      <div
        className={`
        w-full h-16 p-2 text-lg rounded flex items-center 
        ${themeClass}
        `}
      >
        <div className="mr-2">
          <SvgIcon
            name="Search"
            size={40}
            color={theme === 'light' ? colors.grey : colors.white}
          />
        </div>
        <input
          className={`w-full outline-none ${
            theme === 'light' ? 'bg-white' : 'bg-dark-background-layout'
          }`}
          ref={ref}
          {...rest}
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    );
  }
);

const THEME_VARIANTS = {
  light: 'bg-white text-black border border-border-grey',
  dark: 'bg-dark-background-layout text-white border border-black',
  focusLight: 'bg-white text-black border border-grey',
  focusDark: 'bg-dark-background-layout text-white border border-white-300',
};

export default GlobalSearchInput;
