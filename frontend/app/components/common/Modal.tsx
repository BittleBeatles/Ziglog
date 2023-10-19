import { ReactNode } from 'react';
interface ModalProps {
  children: ReactNode;
  size: 'small' | 'large';
}
export default function Modal({ children, size }: ModalProps) {
  return (
    <div className={`${SIZE_VARIANTS[size]} bg-modal shadow-md`}>
      {children}
    </div>
  );
}

const SIZE_VARIANTS = {
  small: 'w-96 h-60',
  large: 'w-1/3 h-96',
};
