'use client';
import GraphViewWrapper from '@components/userPage/GraphViewWrapper';
import { useAppSelector } from '@store/store';

export default function UserPage() {
  const theme = useAppSelector((state) => state.user.theme);
  return <GraphViewWrapper theme={theme} />;
}
