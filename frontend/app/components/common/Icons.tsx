import React from 'react';
import * as Icons from '../../src/design/iconIndex';
import Image from 'next/image';

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  width?: number;
  height?: number;
}

function SvgIcons({ name, size, width, height, ...props }: IconProps) {
  const iconSrc = Icons[name];

  return <Image src={iconSrc} alt={'icons'} width={width} height={height} />;
}

export default SvgIcons;
