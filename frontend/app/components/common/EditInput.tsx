'use client';
import React, { Dispatch, SetStateAction, forwardRef, useState } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import { InputHTMLAttributes } from 'react';
import colors from '@src/design/color';
import IconButton from './IconButton';
import Text from './Text';

interface EditInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  setFolderEdit?: Dispatch<SetStateAction<boolean>>;
}
interface THEME_FOCUSED {
  isFocused: boolean;
  theme: 'light' | 'dark';
}

const EditInput = forwardRef<HTMLInputElement, EditInputProps>(
  ({ theme = 'light', setFolderEdit, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    function getThemeVariant({ isFocused, theme }: THEME_FOCUSED) {
      if (isFocused && theme === 'light') return THEME_VARIANTS.focusLight;
      if (isFocused && theme === 'dark') return THEME_VARIANTS.focusDark;
      return THEME_VARIANTS[theme];
    }

    const themeClass = getThemeVariant({ isFocused, theme });

    return (
      <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`flex flex-col rounded w-1/3 p-5 ${themeClass}`}>
          <div className="flex justify-between mb-3">
            <Text type="h4">폴더명 수정</Text>
            <IconButton
              theme={theme}
              name="Close"
              onClick={() => setFolderEdit && setFolderEdit(false)}
            />
          </div>
          <div className={`h-16 p-2 text-lg flex border items-center `}>
            <input
              className={`w-full outline-none ${
                theme === 'light' ? 'bg-white' : 'bg-dark-background-page'
              }`}
              ref={ref}
              {...rest}
              type="text"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </div>
      </div>
    );
  }
);

const THEME_VARIANTS = {
  light: 'bg-white text-black border border-border-grey',
  dark: 'bg-dark-background-page text-white border border-black',
  focusLight: 'bg-white text-black border border-grey',
  focusDark: 'bg-dark-background-page text-white border border-white-300',
};

export default EditInput;
