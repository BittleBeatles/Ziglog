'use client';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import Link from 'next/link';

export interface NoteProps {
  type?: 'note';
  noteId: string;
  name: string;
}

export default function Note({ type, name, noteId }: NoteProps) {
  return (
    <Link
      href={`/user-page/${'user-name'}/read-note/${noteId}`}
      className="flex items-center pl-5 mt-2 mb-2"
    >
      <SvgIcon name="Note" />
      <Text className="pl-1">{name}</Text>
    </Link>
  );
}
