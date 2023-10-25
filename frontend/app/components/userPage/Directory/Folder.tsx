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
  title: string;
  notes?: DirectoryItem[];
  depth?: number;
  theme?: 'light' | 'dark';
}

export default function Folder({
  type,
  folderId,
  title,
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
        <Text className={`pl-1 truncate ${THEME_VARINTS[theme]}`}>{title}</Text>
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
                  title={item.title}
                />
              ) : (
                <Folder
                  theme={theme}
                  key={item.folderId}
                  title={item.title}
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
  light: '',
  dark: 'text-white',
};

const BORDER_VARINTS = {
  light: 'border-l-2',
  dark: 'border-l-2 border-grey',
};
