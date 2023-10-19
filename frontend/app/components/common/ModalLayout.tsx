import { ReactNode } from 'react';
interface ModalProps {
  children: ReactNode;
}
export default function ModalLayout({ children }: ModalProps) {
  return <div className={`w-fit h-fit p-5 bg-modal shadow-md`}>{children}</div>;
}
