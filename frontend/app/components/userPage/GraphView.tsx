'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import colors from '@src/design/color';
import { useRouter } from 'next/navigation';
import { useGraph } from '@components/userPage/GrapView/useGraph';
import { GraphData, Link, Node } from './GrapView/types';

const ForceGraph = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
});

interface GraphViewProps {
  theme: 'light' | 'dark';
}

export default function GraphView({ theme }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const {
    highlightLinks,
    handleNodeHover,
    handleLinkHover,
    nodePaint,
    addNeighborsAndLinks,
  } = useGraph();

  // 노드에서 이웃과 링크 추가해주는 함수
  addNeighborsAndLinks(data);

  const router = useRouter();
  const handleClick = (node: Node) => {
    if (node.type === 'note') {
      router.push(`/user-page/${'SeongYong'}/read-note/${node.id}`);
    } else if (node.type === 'link') {
      router.push(`/user-page/${'SeongYong'}/read-note/${node.id}`);
    } else {
      console.warn('존재하지 않는 노드입니다:', node.type);
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
        onNodeClick={handleClick}
        linkColor={colors.black}
        linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
        linkDirectionalParticles={3}
        linkDirectionalParticleWidth={(link) =>
          highlightLinks.has(link) ? 3 : 0
        }
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        nodeCanvasObject={nodePaint}
      />
    </div>
  );
}

const data: GraphData = {
  nodes: [
    { id: 1, name: 'name1', type: 'folder', nickname: 'seongyong', realId: 1 },
    { id: 2, name: 'name2', type: 'note', nickname: 'hanul', realId: 1 },
    {
      id: 3,
      name: '동성 마 좀 치나',
      type: 'root',
      nickname: 'hanul',
      realId: 1,
    },
    { id: 4, name: 'name4', type: 'folder', nickname: 'hanul', realId: 2 },
    { id: 5, name: 'name5', type: 'note', nickname: 'suhyeong', realId: 2 },
    { id: 6, name: 'name6', type: 'link', nickname: 'suhyeong', realId: 1 },
    { id: 7, name: 'name7', type: 'folder', nickname: 'jeongmin', realId: 3 },
    { id: 8, name: 'name8', type: 'note', nickname: 'hyeona', realId: 3 },
    { id: 9, name: 'name9', type: 'link', nickname: 'yongs', realId: 2 },
    {
      id: 10,
      name: 'name10',
      type: 'folder',
      nickname: 'yongs',
      realId: 4,
    },
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
