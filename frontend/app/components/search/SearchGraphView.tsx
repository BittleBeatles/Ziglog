'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import colors from '@src/design/color';
import { useRouter } from 'next/navigation';
import { useGraph } from '@src/hooks/useGraph';
import { Node, NoteGraphData } from '@api/graph/types';
import ForchGraph2D, {
  ForceGraphMethods as Force2DGraphMehods,
} from 'react-force-graph-2d';
import { showAlert } from '@src/util/alert';
import { getAllGraph } from '@api/graph/graph';
import { useAppSelector } from '@store/store';

interface SearchGraphViewProps {
  theme: 'light' | 'dark';
}

export default function SearchGraphView({ theme }: SearchGraphViewProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { nickname } = useAppSelector((state) => state.user);

  // 크기 조절 변수
  const [dimensions, setDimensions] = useState({ width: 528, height: 672 });

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

  const fg2dref = useRef<Force2DGraphMehods>();

  const {
    highlightLinks,
    handleNodeHover,
    handleLinkHover,
    nodeAllPaint,
    addNeighborsAndLinks,
  } = useGraph();

  const clickCountRef = useRef<number>(0);
  const lastClickedNodeRef = useRef<Node | null>(null);
  const handleClick = useCallback(
    (node: Node) => {
      if (node === lastClickedNodeRef.current) {
        clickCountRef.current++;
      } else {
        clickCountRef.current = 1;
        lastClickedNodeRef.current = node;
      }

      if (clickCountRef.current === 1) {
        // 첫 번째 클릭
        if (fg2dref.current) {
          fg2dref.current.centerAt(node.x, node.y, 1000);
          fg2dref.current.zoom(8, 200);
        }
      } else if (clickCountRef.current === 2) {
        // 두 번째 클릭
        if (node.isPublic || node.nickname === nickname) {
          if (node.type === 'note') {
            router.push(`/user-page/${node.nickname}/read-note/${node.realId}`);
          } else {
            showAlert('노트를 클릭해주세요', 'warning');
          }
        } else {
          showAlert('비공개 글은 읽을 수 없습니다', 'warning');
        }
        clickCountRef.current = 0; // 클릭 카운트 초기화
      }
    },
    [router, fg2dref]
  );

  const [graphData, setGraphData] = useState<NoteGraphData>({
    nodes: [],
    links: [],
  });
  const getAllGraphData = async () => {
    const res = await getAllGraph();
    if (res) {
      setGraphData(res);
    }
  };

  useEffect(() => {
    getAllGraphData();
  }, []);

  addNeighborsAndLinks(graphData);

  return (
    <div className="w-full" ref={containerRef}>
      <ForchGraph2D
        ref={fg2dref}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        onNodeClick={handleClick}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        nodeCanvasObject={nodeAllPaint}
        nodeVal={0.2}
        linkColor={() => colors['main-25']}
        linkWidth={(link) => (highlightLinks.has(link) ? 3 : 1)}
        linkDirectionalArrowLength={(link) =>
          highlightLinks.has(link) ? 3 : 0
        }
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowColor={() => colors['main-50']}
      />
    </div>
  );
}
