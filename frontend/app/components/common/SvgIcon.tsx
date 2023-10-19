import React from 'react';
import * as Icons from '../../src/design/iconIndex';
import Image from 'next/image';

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
}

export default function SvgIcon({ name, size = 24 }: IconProps) {
  const iconSrc = Icons[name];

  return <Image src={iconSrc} alt={'icons'} width={size} height={size} />;
}
