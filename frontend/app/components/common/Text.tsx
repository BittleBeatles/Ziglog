import { ReactNode } from 'react';

interface TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'b' | 'span';
  children: ReactNode;
  className?: string;
}

export default function Text({ type = 'p', children, className }: TextProps) {
  const Tag =
    type === 'h1'
      ? 'h1'
      : type === 'h2'
      ? 'h2'
      : type === 'h3'
      ? 'h3'
      : type === 'h4'
      ? 'h4'
      : type === 'b'
      ? 'b'
      : type === 'span'
      ? 'span'
      : 'p';

  return (
    <Tag className={`${TYPE_VARIANTS[type]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
const TYPE_VARIANTS = {
  h1: 'text-4xl font-bold leading-tight',
  h2: 'text-3xl font-semibold leading-snug',
  h3: 'text-2xl font-medium',
  h4: 'text-lg font-bold',
  p: 'text-base',
  b: 'text-base font-bold',
  span: 'text-base',
};
