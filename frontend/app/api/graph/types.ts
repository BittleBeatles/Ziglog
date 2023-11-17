import { LinkObject, NodeObject as Node2DObject } from 'react-force-graph-2d';

export interface Node extends Node2DObject {
  id?: string | number;
  name?: string;
  type?: string;
  nickname?: string;
  realId?: number;
  neighbors?: Node[];
  links?: Link[];
}

export interface Link extends LinkObject {
  source?: string | number | Node2DObject;
  target?: string | number | Node2DObject;
}

export interface GraphData {
  folderSet?: number[];
  noteSet?: number[];
  nodes: Node[];
  links: Link[];
}

export interface NoteGraphData {
  nodes: Node[];
  links: Link[];
}

export type Coords = { x: number; y: number; z: number };
