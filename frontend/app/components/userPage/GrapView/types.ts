import { LinkObject, NodeObject } from 'react-force-graph-2d';

export interface Node extends NodeObject {
  id?: string | number;
  name?: string;
  type?: string;
  nickname?: string;
  realId?: number;
  neighbors?: Node[];
  links?: Link[];
}

export interface Link extends LinkObject {
  source?: string | number | NodeObject;
  target?: string | number | NodeObject;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}
