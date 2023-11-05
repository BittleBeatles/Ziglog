'use client';
import { createContext, useState, ReactNode } from 'react';
import { GraphData } from '@api/graph/types';
import { getGraph } from '@api/graph/graph';
import { useParams } from 'next/navigation';

export interface IGraphDataContext {
  graphData: GraphData;
  setGraphData: (graphData: GraphData) => void;
  getGraphData: () => Promise<void>;
}

const defaultGraphDataContext: IGraphDataContext = {
  graphData: { folderSet: [], noteSet: [], nodes: [], links: [] },
  setGraphData: () => {},
  getGraphData: async () => {},
};

const GraphDataContext = createContext<IGraphDataContext>(
  defaultGraphDataContext
);

export const GraphDataProvider = ({ children }: { children: ReactNode }) => {
  const [graphData, setGraphData] = useState<GraphData>(
    defaultGraphDataContext.graphData
  );
  const params = useParams();
  const nickname = decodeURIComponent(params.userNickname as string);

  const getGraphData = async () => {
    const res = await getGraph(nickname);
    if (res) {
      setGraphData(res);
    }
  };
  return (
    <GraphDataContext.Provider
      value={{ graphData, setGraphData, getGraphData }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};

export default GraphDataContext;
