'use client';
import { createContext, useState, ReactNode, useCallback } from 'react';
import { GraphData, NoteGraphData } from '@api/graph/types';
import { getGraph, getNoteGraph } from '@api/graph/graph';
import { useParams, useRouter } from 'next/navigation';
import { getFolderList } from '@api/folder/folder';
import { useAppSelector } from '@store/store';
import { DirectoryItem } from '@api/folder/types';
import { getBookmark } from '@api/bookmark/bookmark';
import { Note } from '@api/bookmark/types';

export interface ISideDataContext {
  // 그래프
  graphData: GraphData;
  setGraphData: (graphData: GraphData) => void;
  getGraphData: () => Promise<void>;

  // 사이드 바 목록
  sideData: DirectoryItem[];
  getSideList: () => void;

  // 북마크
  bookmarkList: Note[];
  getBookmarkList: () => void;

  // 노트 그래프
  noteGraphData: NoteGraphData;
  setNoteGraphData: (noteGraphData: GraphData) => void;
  getNoteGraphData: () => Promise<void>;
}

const defaultSideDataContext: ISideDataContext = {
  // 그래프
  graphData: { folderSet: [], noteSet: [], nodes: [], links: [] },
  setGraphData: () => {},
  getGraphData: async () => {},
  // 사이드 바 목록
  sideData: [],
  getSideList: async () => {},
  // 북마크
  bookmarkList: [],
  getBookmarkList: async () => {},
  // 노트 그래프
  noteGraphData: { nodes: [], links: [] },
  setNoteGraphData: () => {},
  getNoteGraphData: async () => {},
};

const SideDataContext = createContext<ISideDataContext>(defaultSideDataContext);

export const SideDataProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const router = useRouter();
  const paramsNickname = decodeURIComponent(params.userNickname as string);
  const isLogin = useAppSelector((state) => state.user.isLogin);
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

  // 노트 그래프 데이터
  const [noteGraphData, setNoteGraphData] = useState<GraphData>(
    defaultSideDataContext.noteGraphData
  );

  const getNoteGraphData = async () => {
    const res = await getNoteGraph(paramsNickname);
    if (res) {
      setNoteGraphData(res);
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
      router.push('/not-found');
    }
  }, [nickname]);

  // 북마크 데이터
  const [bookmarkList, setBookmarkList] = useState<Note[]>([]);
  const getBookmarkList = async () => {
    if (isLogin) {
      const result = await getBookmark();
      if (result) {
        setBookmarkList(result.notes);
      }
    } else {
      return;
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
        noteGraphData,
        setNoteGraphData,
        getNoteGraphData,
      }}
    >
      {children}
    </SideDataContext.Provider>
  );
};

export default SideDataContext;
