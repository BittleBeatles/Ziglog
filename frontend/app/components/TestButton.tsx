'use client';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'small' | 'big';
}

export default function TestButton({ size, ...rest }: Props) {
  const router = useRouter();
  return (
    <div className="flex-none">
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white rounded ${SIZE_VARIANTS[size]}`}
        type="button"
        onClick={() => console.log('테스트버튼 클릭')}
      >
        테스트 버튼입니다.(클라이언트 컴포넌트)
      </button>
    </div>
  );
}

const SIZE_VARIANTS = {
  small: 'py-1 px-2 text-sm',
  big: 'py-3 px-6 text-lg',
};
