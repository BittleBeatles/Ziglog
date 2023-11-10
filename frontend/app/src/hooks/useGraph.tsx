import { useCallback, useState } from 'react';
import { Node, Link, GraphData } from '@api/graph/types';
import colors from '@src/design/color';
import { useAppSelector } from '@store/store';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';

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

        ctx.font = '3px Pretendard';
        ctx.textAlign = 'center';
        ctx.fillText(name, x, y + textDistance);
      };

      if (node.x && node.y && node.name && node.nickname) {
        if (node.type === 'folder' && node.name === 'root') {
          drawCircle(node.nickname, 5, node.x, node.y, 2, colors['main-100']);
        } else {
          switch (node.type) {
            case 'folder':
              drawCircle(node.name, 5, node.x, node.y, 2, colors['main-75']);
              break;
            case 'note':
              drawCircle(
                node.name,
                5,
                node.x,
                node.y,
                2,
                theme === 'light' ? colors.charcol : colors.white
              );
              break;
            case 'link':
              drawCircle(node.name, 5, node.x, node.y, 2, colors['main-50']);
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
            color = '#888888';
            console.error('Unknown node type:', node.type);
            break;
        }
      }

      const geometry = new THREE.SphereGeometry(5, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 80,
      });
      const sphere = new THREE.Mesh(geometry, material);

      let sprite;
      if (node.name === 'root') {
        sprite = new SpriteText(node.nickname);
      } else {
        sprite = new SpriteText(node.name);
      }
      sprite.color = theme === 'light' ? colors.charcol : colors.white;
      sprite.textHeight = 3;
      sprite.position.set(0, 10, 0);
      sprite.fontFace = 'Pretendard';
      // sprite.fontSize = 1;

      sphere.add(sprite);

      const group = new THREE.Group();
      group.add(sphere);

      return group;
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
