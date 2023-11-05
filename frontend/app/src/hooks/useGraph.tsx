import { useCallback, useState } from 'react';
import { Node, Link, GraphData } from '@api/graph/types';
import colors from '@src/design/color';
import { useAppSelector } from '@store/store';
import * as THREE from 'three';

export const useGraph = () => {
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<Node | null>(null);
  const { theme } = useAppSelector((state) => state.user);

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

  // 2d 버전 페인팅
  const nodePaint = useCallback(
    (node: Node, ctx: CanvasRenderingContext2D) => {
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

        ctx.font = '6px Pretendard';
        ctx.textAlign = 'center';
        ctx.fillText(name, x, y + textDistance);
      };

      if (node.x && node.y && node.name && node.nickname) {
        if (node.type === 'folder' && node.name === 'root') {
          drawCircle(node.nickname, 14, node.x, node.y, 8, colors['main-100']);
        } else {
          switch (node.type) {
            case 'folder':
              drawCircle(node.name, 12, node.x, node.y, 5, colors['main-75']);
              break;
            case 'note':
              drawCircle(
                node.name,
                12,
                node.x,
                node.y,
                5,
                theme === 'light' ? colors.charcol : colors.white
              );
              break;
            case 'link':
              drawCircle(node.name, 12, node.x, node.y, 5, colors['main-50']);
              break;
            default:
              console.error('Unknown node type:', node.type);
              break;
          }
        }
      }
    },
    [theme]
  );

  // 3d 버전 페인팅
  const node3dPaint = useCallback(
    (node: Node) => {
      const canvas = document.createElement('canvas');
      const size = 128;
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        const texture = new THREE.Texture();
        const material = new THREE.SpriteMaterial({ map: texture });
        const fallbackSprite = new THREE.Sprite(material);
        fallbackSprite.scale.set(10, 10, 10);
        return fallbackSprite;
      }

      const drawCircle = (color: string) => {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
      };

      const drawText = (text: string, fontSize: number, color: string) => {
        ctx.font = `30px Pretendard`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color;
        ctx.fillText(text, size / 2, size / 2);
      };

      let color;

      if (node.name === 'root') {
        color = colors['main-100'];
      } else {
        switch (node.type) {
          case 'folder':
            color = colors['main-75'];
            break;
          case 'note':
            color = theme === 'light' ? colors.charcol : colors.white;
            break;
          case 'link':
            color = colors['main-50'];
            break;
          default:
            color = '#888888'; // Default color for unknown types
            console.error('Unknown node type:', node.type);
            break;
        }
      }

      drawCircle(color);
      if (node.name) {
        drawText(node.name, 12, 'black'); // You can adjust the font size and text color as needed
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true; // Update the texture

      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(10, 10, 10); // The scale can be adjusted as needed

      return sprite;
    },
    [theme]
  );

  return {
    highlightLinks,
    hoverNode,
    handleNodeHover,
    handleLinkHover,
    nodePaint,
    node3dPaint,
    addNeighborsAndLinks,
  };
};
