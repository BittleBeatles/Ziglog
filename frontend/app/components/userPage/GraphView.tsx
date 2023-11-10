'use client';
import React, { useRef, useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import colors from '@src/design/color';
import { useParams, useRouter } from 'next/navigation';
import { useGraph } from '@src/hooks/useGraph';
import { Node } from '@api/graph/types';
import SideDataContext from '@(pages)/user-page/[userNickname]/SideDataContext';
import NodeSample from '@components/common/NodeSample';
import GraphConverter from '@components/common/GraphConverter';

const ForchGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
});

const ForchGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
});

interface GraphViewProps {
  theme: 'light' | 'dark';
}

export default function GraphView({ theme }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const params = useParams();
  const nickname = decodeURIComponent(params.userNickname as string);
  const { graphData, getGraphData } = useContext(SideDataContext);
  const [changeView, setChangeView] = useState<'2d' | '3d' | 'note'>('2d');

  useEffect(() => {
    getGraphData();
  }, [nickname]);

  const {
    highlightLinks,
    handleNodeHover,
    handleLinkHover,
    nodePaint,
    node3dPaint,
    addNeighborsAndLinks,
  } = useGraph();

  addNeighborsAndLinks(graphData);

  const router = useRouter();
  const handleClick = (node: Node) => {
    if (node.type === 'note') {
      router.push(`/user-page/${nickname}/read-note/${node.realId}`);
    } else if (node.type === 'link') {
      router.push(`/user-page/${nickname}/read-note/${node.realId}`);
    } else {
      console.warn('존재하지 않는 노드입니다:', node.type);
    }
  };

  const onGraphChange = (current: '2d' | '3d' | 'note') => {
    setChangeView(current);
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
    <div
      className="w-full h-full flex flex-col justify-center items-center relative"
      ref={containerRef}
    >
      <div className="flex absolute top-0 left-0 p-3 z-10 items-center">
        <NodeSample theme={theme} type="folder" text="폴더" />
        {theme === 'light' ? (
          <NodeSample theme={theme} type="noteLight" text="노트" />
        ) : (
          <NodeSample theme={theme} type="noteDark" text="노트" />
        )}

        <NodeSample theme={theme} type="link" text="참조" />
      </div>
      <div className="absolute top-0 right-0 p-3 z-10">
        <GraphConverter current={changeView} onGraphChange={onGraphChange} />
      </div>
      {changeView === '2d' && (
        <ForchGraph2D
          graphData={graphData}
          width={dimensions.width - 30}
          height={dimensions.height - 30}
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
      )}

      {changeView === '3d' && (
        <ForchGraph3D
          graphData={graphData}
          width={dimensions.width - 30}
          height={dimensions.height - 30}
          onNodeClick={handleClick}
          backgroundColor="rgba(255, 255, 255, 0)"
          nodeColor={colors.black}
          nodeThreeObject={node3dPaint}
          linkColor={() => colors.grey}
        />
      )}

      {changeView === 'note' && (
        <ForchGraph2D
          graphData={graphData}
          width={dimensions.width - 30}
          height={dimensions.height - 30}
        />
      )}
    </div>
  );
}
