'use client';
import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import colors from '@src/design/color';
import { nodePaint } from './GrapView.tsx/NodeImage';
import { useRouter } from 'next/navigation';

const ForceGraph = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
});

interface GraphViewProps {
  theme: 'light' | 'dark';
}

export default function GraphView({ theme }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  const router = useRouter();
  const handleClick = (node: Node) => {
    if (node.type === 'note') {
      router.push(`/user-page/${'SeongYong'}/read-note/${node.id}`);
    } else if (node.type === 'link') {
      router.push(`/user-page/${'SeongYong'}/read-note/${node.id}`);
    } else {
      console.warn('Unknown node type:', node.type);
    }
  };

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="w-full h-full" ref={containerRef}>
      <ForceGraph
        graphData={data}
        width={dimensions.width - 5}
        height={dimensions.height - 5}
        backgroundColor={
          theme === 'light' ? colors.white : colors['dark-background-layout']
        }
        nodeCanvasObject={nodePaint}
        onNodeClick={handleClick}
        linkWidth={3}
        linkColor={colors.black}
      />
    </div>
  );
}

const data: GraphData = {
  nodes: [
    { id: 1, name: 'name1', type: 'folder' },
    { id: 2, name: 'name2', type: 'note' },
    { id: 3, name: '동성 마 좀 치나', type: 'root' },
    { id: 4, name: 'name4', type: 'folder' },
    { id: 5, name: 'name5', type: 'note' },
    { id: 6, name: 'name6', type: 'link' },
    { id: 7, name: 'name7', type: 'folder' },
    { id: 8, name: 'name8', type: 'note' },
    { id: 9, name: 'name9', type: 'link' },
    { id: 10, name: 'name10', type: 'folder' },
  ],
  links: [
    { source: 1, target: 3 },
    { source: 2, target: 1 },
    { source: 4, target: 3 },
    { source: 5, target: 4 },
    { source: 6, target: 4 },
    { source: 7, target: 3 },
    { source: 8, target: 7 },
    { source: 9, target: 7 },
    { source: 10, target: 3 },
  ],
};

export interface Node {
  id?: string | number;
  name?: string;
  type?: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
}

interface Link {
  source: number;
  target: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}
