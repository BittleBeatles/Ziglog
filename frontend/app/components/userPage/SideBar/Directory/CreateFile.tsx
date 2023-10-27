import React, { useEffect, useRef } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import colors from '@src/design/color';
import { InputHTMLAttributes } from 'react';

interface FolderCreateProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'folder' | 'note';
}

export default function CreateFile({
  type = 'folder',
  ...rest
}: FolderCreateProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex mt-2 mb-2">
      {type === 'note' ? (
        <SvgIcon name="Note" color={colors.grey} />
      ) : (
        <SvgIcon name="Folder" color={colors.grey} />
      )}

      <input className="w-full" ref={inputRef} {...rest} type="text" />
    </div>
  );
}
