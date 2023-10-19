import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import * as Icons from '../../src/design/iconIndex';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: keyof typeof Icons;
}
export default function IconButton({ name }: IconButtonProps) {
  return (
    <div className=" bg-white w-fit h-fit p-1 rounded-lg border border-border-grey">
      <SvgIcon name={name} />
    </div>
  );
}
