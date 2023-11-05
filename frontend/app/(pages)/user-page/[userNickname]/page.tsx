'use client';
import GraphView from '@components/userPage/GraphView';
import { useAppSelector } from '@store/store';

export default function UserPage() {
  const theme = useAppSelector((state) => state.user.theme);
  return <GraphView theme={theme} />;
}
