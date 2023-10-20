import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';

interface PublicPrivateToggleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'public' | 'private';
}

export default function PublicPrivateToggle({
  type,
}: PublicPrivateToggleProps) {
  return (
    <button className="flex flex-row gap-3 bg-light-background-layout border border-border-grey rounded-lg w-fit p-3 font-bold">
      <SvgIcon name={type} />
      <Text type="span">{type === 'public' ? '전체공개' : '비공개'}</Text>
    </button>
  );
}
