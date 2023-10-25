'use client';
import Text from '@components/common/Text';
import { DirectoryItem } from '../Directory';
import Note from './Note';
import SvgIcon from '@components/common/SvgIcon';
import { useState } from 'react';
import colors from '@src/design/color';

export interface FolderProps {
  type?: 'folder';
  folderId?: number;
  name: string;
  notes?: DirectoryItem[];
  depth?: number;
  theme?: 'light' | 'dark';
}

export default function Folder({
  type,
  folderId,
  name,
  notes,
  depth = 0,
  theme = 'light',
}: FolderProps) {
  const paddingLeft = `${depth * 1.25}rem`;
  const [isFolderOpen, setFolderOpen] = useState(false);

  return (
    <div className="folder mb-3" style={{ paddingLeft }}>
      <div
        onClick={() => setFolderOpen(!isFolderOpen)}
        className="flex items-center cursor-pointer"
      >
        {isFolderOpen ? (
          <SvgIcon
            name="FolderOpen"
            color={theme === 'light' ? colors.black : colors.white}
          />
        ) : (
          <SvgIcon
            name="Folder"
            color={theme === 'light' ? colors.black : colors.white}
          />
        )}
        <Text className={`pl-1 truncate ${THEME_VARINTS[theme]}`}>{name}</Text>
      </div>
      {isFolderOpen && (
        <div className={`${BORDER_VARINTS[theme]}`}>
          {notes &&
            notes.map((item, index) =>
              item.type === 'note' ? (
                <Note
                  theme={theme}
                  key={item.noteId}
                  noteId={item.noteId}
                  name={item.name}
                />
              ) : (
                <Folder
                  theme={theme}
                  key={item.folderId}
                  name={item.name}
                  notes={item.notes}
                  depth={depth + 1}
                />
              )
            )}
        </div>
      )}
    </div>
  );
}

const THEME_VARINTS = {
  light: 'text-black',
  dark: 'text-white',
};

const BORDER_VARINTS = {
  light: 'border-l-2',
  dark: 'border-l-2 border-grey',
};
