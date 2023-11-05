import React, { useEffect, useRef } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import colors from '@src/design/color';
import { InputHTMLAttributes } from 'react';

interface FolderCreateProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'folder' | 'note';
  theme: 'light' | 'dark';
}

export default function CreateFile({
  type = 'folder',
  theme,
  ...rest
}: FolderCreateProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      {type === 'note' ? (
        <SvgIcon name="Note" />
      ) : (
        <div className={`flex mt-2 mb-2 ${THEME_VARIANTS[theme]}`}>
          <SvgIcon name="Folder" color={colors.grey} />
          <input className="w-full" ref={inputRef} {...rest} type="text" />
        </div>
      )}
    </div>
  );
}

const THEME_VARIANTS = {
  light: '',
  dark: 'text-black',
};
