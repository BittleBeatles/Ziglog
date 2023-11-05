import { ReactNode } from 'react';
interface ModalProps {
  children: ReactNode;
  classname?: string;
}
export default function ModalLayout({ children, classname }: ModalProps) {
  return (
    <div className={`${classname} w-fit h-fit p-5 shadow-md`}>{children}</div>
  );
}
