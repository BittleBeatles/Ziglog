import React from 'react';
import * as Icons from '@src/design/iconIndex';

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
}

export default function SvgIcon({
  name,
  size = 26,
  color = 'black',
}: IconProps) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`아이콘 이름 중에 "${name}"를 가진 아이콘은 없어요~`);
    return null;
  }

  return <IconComponent width={size} height={size} fill={color} />;
}
