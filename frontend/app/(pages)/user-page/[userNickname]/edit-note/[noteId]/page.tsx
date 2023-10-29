'use client';
import { useParams } from 'next/navigation';
import Text from '@components/common/Text';
import MarkdownEditor from '@components/userPage/MarkdownEditor';
import PublicPrivateToggle from '@components/userPage/PublicPrivateToggle';
import Button from '@components/common/Button';
import { useState } from 'react';

// decodeURIComponent(params.userNickname as string)
export default function EditNote() {
  const theme = 'light';
  const params = useParams();
  const [isPublic, setIsPublic] = useState(false);
  return (
    <div>
      <div className="flex flex-row justify-between mb-3">
        <div className="flex flex-row gap-3">
          <Text type="h1">글제목</Text>
          <PublicPrivateToggle
            onClick={() => setIsPublic(!isPublic)}
            scope={isPublic ? 'Public' : 'Private'}
            theme={theme}
          />
        </div>
        <Button label="저장하기" color="charcol" />
      </div>
      <MarkdownEditor theme="light" />
    </div>
  );
}
