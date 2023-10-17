'use client';
import { useRouter } from 'next/navigation';

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <section>
      <button
        className="bg-red-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        type="button"
        onClick={() => router.push('/')}
      >
        난 레이아웃이야
      </button>
      {children}
    </section>
  );
}
