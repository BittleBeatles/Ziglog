'use client';
import Text from '@components/common/Text';
import { DirectoryItem } from '../Directory';
import Note from './Note';
import SvgIcon from '@components/common/SvgIcon';
import { useState } from 'react';

export interface FolderProps {
  type?: 'folder';
  folderId?: string;
  name: string;
  notes?: DirectoryItem[];
  depth?: number;
}

export default function Folder({
  type,
  folderId,
  name,
  notes,
  depth = 0,
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
          <SvgIcon name="FolderOpen" />
        ) : (
          <SvgIcon name="Folder" />
        )}
        <Text className="pl-1">{name}</Text>
      </div>
      {isFolderOpen && (
        <div className="notes border-l-2">
          {notes &&
            notes.map((item, index) =>
              item.type === 'note' ? (
                <Note key={item.noteId} noteId={item.noteId} name={item.name} />
              ) : (
                <Folder
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
