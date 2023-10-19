import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '@components/common/SvgIcon';
interface PublicPrivateToggleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'public' | 'private';
}

export default function PublicPrivateToggle({
  type,
}: PublicPrivateToggleProps) {
  return (
    <div className="flex flex-row gap-3 bg-light-background-layout border border-border-grey rounded-lg w-fit p-3 font-bold">
      <SvgIcon name={type} />
      <span>{type === 'public' ? '전체공개' : '비공개'}</span>
    </div>
  );
}
