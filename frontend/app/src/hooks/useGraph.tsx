import { useCallback, useState } from 'react';
import { Node, Link, GraphData } from '@components/userPage/GrapView/types';
import colors from '@src/design/color';

export const useGraph = () => {
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<Node | null>(null);

  const addNeighborsAndLinks = (data: GraphData) => {
    data.links.forEach((link) => {
      const sourceNode = data.nodes.find((node) => node.id === link.source);
      const targetNode = data.nodes.find((node) => node.id === link.target);

      if (sourceNode && targetNode) {
        sourceNode.neighbors = sourceNode.neighbors || [];
        sourceNode.links = sourceNode.links || [];
        sourceNode.neighbors.push(targetNode);
        sourceNode.links.push(link);
        targetNode.neighbors = targetNode.neighbors || [];
        targetNode.links = targetNode.links || [];
        targetNode.neighbors.push(sourceNode);
        targetNode.links.push(link);
      }
    });
  };

  const updateHighlight = () => {
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node: Node | null, previousNode: Node | null) => {
    highlightLinks.clear();
    if (node && node.neighbors && node.links) {
      // node.neighbors.forEach((neighbor) => highlightNodes.add(neighbor));
      node.links.forEach((link) => highlightLinks.add(link));
    }
    setHoverNode(node || null);
    updateHighlight();
  };

  const handleLinkHover = (link: Link | null, previousLink: Link | null) => {
    highlightLinks.clear();
    if (link) {
      highlightLinks.add(link);
    }
    updateHighlight();
  };

  const nodePaint = useCallback((node: Node, ctx: CanvasRenderingContext2D) => {
    const drawCircle = (
      name: string,
      textDistance: number,
      x: number,
      y: number,
      size: number,
      color: string
    ) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI, false);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.font = '6px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, y + textDistance);
    };

    if (node.x && node.y && node.name) {
      switch (node.type) {
        case 'folder':
          drawCircle(node.name, 10, node.x, node.y, 5, colors['main-75']);
          break;
        case 'root':
          drawCircle(node.name, 14, node.x, node.y, 8, colors['main-100']);
          break;
        case 'note':
          drawCircle(node.name, 10, node.x, node.y, 5, colors.charcol);
          break;
        case 'link':
          drawCircle(node.name, 10, node.x, node.y, 5, colors['main-50']);
          break;
        default:
          console.error('Unknown node type:', node.type);
          break;
      }
    }
  }, []);

  return {
    highlightLinks,
    hoverNode,
    handleNodeHover,
    handleLinkHover,
    nodePaint,
    addNeighborsAndLinks,
  };
};
