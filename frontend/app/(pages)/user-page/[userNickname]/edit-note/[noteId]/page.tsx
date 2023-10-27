'use client';
import { useParams } from 'next/navigation';
import Text from '@components/common/Text';
import MarkdownEditor from '@components/userPage/MarkdownEditor';
import PublicPrivateToggle from '@components/userPage/PublicPrivateToggle';
import Button from '@components/common/Button';
// decodeURIComponent(params.userNickname as string)
export default function EditNote() {
  const params = useParams();

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Text type="h1">글제목</Text>
          <PublicPrivateToggle scope="Private" />
        </div>
        <Button label="저장" color="charcol" />
      </div>
      <MarkdownEditor />
    </div>
  );
}
