'use client';
import { createContext, useState, ReactNode, useCallback } from 'react';
import { GraphData } from '@api/graph/types';
import { getGraph } from '@api/graph/graph';
import { useParams } from 'next/navigation';
import { getFolderList } from '@api/folder/folder';
import { useAppSelector } from '@store/store';
import { DirectoryItem } from '@api/folder/types';
import { getBookmark } from '@api/bookmark/bookmark';
import { Note } from '@api/bookmark/types';

export interface ISideDataContext {
  graphData: GraphData;
  setGraphData: (graphData: GraphData) => void;
  getGraphData: () => Promise<void>;
  sideData: DirectoryItem[];
  getSideList: () => void;
  bookmarkList: Note[];
  getBookmarkList: () => void;
}

const defaultSideDataContext: ISideDataContext = {
  graphData: { folderSet: [], noteSet: [], nodes: [], links: [] },
  setGraphData: () => {},
  getGraphData: async () => {},
  sideData: [],
  getSideList: async () => {},
  bookmarkList: [],
  getBookmarkList: async () => {},
};

const SideDataContext = createContext<ISideDataContext>(defaultSideDataContext);

export const SideDataProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const paramsNickname = decodeURIComponent(params.userNickname as string);
  // 그래프 데이터
  const [graphData, setGraphData] = useState<GraphData>(
    defaultSideDataContext.graphData
  );
  const { nickname } = useAppSelector((state) => state.user);

  const getGraphData = async () => {
    const res = await getGraph(paramsNickname);
    if (res) {
      setGraphData(res);
    }
  };

  // 폴더 탐색기 데이터
  const [sideData, setSideData] = useState<DirectoryItem[]>([]);
  const getSideList = useCallback(async () => {
    try {
      const res = await getFolderList(paramsNickname);
      if (res) {
        setSideData(res);
      }
    } catch (error) {
      console.error('Failed to fetch directory list:', error);
    }
  }, [nickname]);

  // 북마크 데이터
  const [bookmarkList, setBookmarkList] = useState<Note[]>([]);
  const getBookmarkList = async () => {
    const result = await getBookmark();
    if (result) {
      setBookmarkList(result.notes);
    }
  };

  return (
    <SideDataContext.Provider
      value={{
        graphData,
        setGraphData,
        getGraphData,
        sideData,
        getSideList,
        bookmarkList,
        getBookmarkList,
      }}
    >
      {children}
    </SideDataContext.Provider>
  );
};

export default SideDataContext;
