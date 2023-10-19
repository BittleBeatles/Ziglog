import { HTMLAttributes, ReactNode } from 'react';

interface WhiteBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function WhiteBox({
  children,
  className,
  ...rest
}: WhiteBoxProps) {
  return (
    <div
      {...rest}
      className={`bg-white w-4/5 h-full shadow-md p-5 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
