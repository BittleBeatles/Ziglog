'use client';
import GraphView from '@components/userPage/GraphView';
import { useParams } from 'next/navigation';

export default function UserPage() {
  const theme = 'light';
  return <GraphView theme={theme} />;
}
