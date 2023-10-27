'use client';
import ProfileImage from '@components/common/ProfileImage';
import { FormEvent, useEffect, useRef, useState } from 'react';
import DongSuk from '@public/images/DongSuk.jpg';
import Text from '@components/common/Text';
import IconButtonWithBg from './IconButtonWithBg';
import PersonalSearchInput from './SideBar/PersonalSearchInput';
import Directory, { DirectoryItem } from './SideBar/Directory';
import BookmarkList from './SideBar/BookmarkList';
import IconButton from '@components/common/IconButton';
import Button from '@components/common/Button';
import { useRouter } from 'next/navigation';

interface SideBarProps {
  theme: 'light' | 'dark';
}

export default function SideBar({ theme }: SideBarProps) {
  const [isLogined, setLogined] = useState(true);
  const [isMine, setMine] = useState(true);
  const nickname = '동석 마 좀 치나';
  const router = useRouter();
  const [directory, setDirectory] = useState<DirectoryItem[]>(directoryList);
  const [parentId, setParentId] = useState<number>(-1);
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [noteName, setNoteName] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // 노트 추가
  const addNote = () => {
    setShowNoteInput(true);
    setShowFolderInput(false);
  };

  // 폴더 추가
  const addFolder = () => {
    setShowFolderInput(true);
    setShowNoteInput(false);
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowFolderInput(false);
        setShowNoteInput(false);
      }
    }
    // 클릭 이벤트를 document에 추가
    document.addEventListener('click', handleOutsideClick);
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="flex flex-col justify-between py-4 h-screen"
      ref={sidebarRef}
    >
      <div className="profile flex justify-start items-center px-8">
        <ProfileImage src={DongSuk} />
        <Text
          type="p"
          className={`pl-3 ${theme === 'dark' ? 'text-white' : ''}`}
        >
          {nickname}
        </Text>
      </div>
      <div className="control flex justify-between mt-5 px-8">
        <IconButtonWithBg
          onClick={() => router.push('/search')}
          size={30}
          theme={theme}
          name="GlobalSearch"
        />
        <IconButtonWithBg
          onClick={addFolder}
          size={30}
          theme={theme}
          name="AddFolder"
        />
        <IconButtonWithBg
          onClick={addNote}
          size={30}
          theme={theme}
          name="AddNote"
        />
        <IconButtonWithBg
          onClick={() => router.push(`/user-page/${nickname}`)}
          size={30}
          theme={theme}
          name="GraphView"
        />
      </div>

      <div className="flex justify-center mt-5 px-8">
        <PersonalSearchInput theme={theme} placeholder="노트 검색" />
      </div>

      <div
        id="sidebar-scroll"
        className="h-full w-full overflow-y-auto scroll-bar px-2"
      >
        <div className="px-6">
          <div className="flex justify-start mt-5">
            <Directory
              parentId={parentId}
              setParentId={setParentId}
              showFolderInput={showFolderInput}
              showNoteInput={showNoteInput}
              setShowFolderInput={setShowFolderInput}
              setShowNoteInput={setShowNoteInput}
              theme={theme}
              directoryList={directory}
              setFolderName={setFolderName}
              setNoteName={setNoteName}
              folderName={folderName}
              noteName={noteName}
            />
          </div>
          <hr />
          <div className="flex justify-start mt-5">
            <BookmarkList theme={theme} noteList={noteList} />
          </div>
        </div>
      </div>

      <div className="flex justify-between px-8">
        <IconButton
          theme={theme}
          name={theme === 'light' ? 'DarkMode' : 'LightMode'}
        />
        {!isLogined && <Button label="로그인하기" color="charcol" />}

        {isLogined && isMine && <Button label="로그아웃" color="charcol" />}

        {isLogined && !isMine && (
          <Button label="마이페이지로 가기" color="charcol" />
        )}
        {isLogined && isMine && <IconButton theme={theme} name="Setting" />}
      </div>
    </div>
  );
}

const directoryList: DirectoryItem[] = [
  {
    type: 'folder',
    folderId: 1,
    title: 'React',
    notes: [
      {
        type: 'note',
        nickname: 'seongyong',
        noteId: 1,
        title: 'React 1강 기초',
      },
      {
        type: 'folder',
        folderId: 2,
        title: 'components',
        notes: [
          {
            type: 'note',
            nickname: 'seongyong',
            noteId: 2,
            title: 'React 2강 훅스',
          },
        ],
      },
    ],
  },
  {
    type: 'folder',
    folderId: 3,
    title: 'Vue',
    notes: [
      {
        type: 'note',
        nickname: 'seongyong',
        noteId: 3,
        title: 'Vue 1강 기초',
      },
    ],
  },
];

const noteList = [
  {
    noteId: 1,
    userNickname: 'SeongYong',
    title: 'Study JavaScript Basics',
  },
  {
    noteId: 2,
    userNickname: 'SeongYong',
    title: 'Understanding TypeScript',
  },
  {
    noteId: 3,
    userNickname: 'SeongYong',
    title: 'Exploring React Hooks',
  },
  {
    noteId: 4,
    userNickname: 'SeongYong',
    title: 'Diving into Node.js',
  },
  {
    noteId: 5,
    userNickname: 'SeongYong',
    title: 'GraphQL Introduction',
  },
  {
    noteId: 6,
    userNickname: 'SeongYong',
    title: 'Understanding TypeScript',
  },
  {
    noteId: 7,
    userNickname: 'SeongYong',
    title: 'Exploring React Hooks',
  },
  {
    noteId: 8,
    userNickname: 'SeongYong',
    title: 'Diving into Node.js',
  },
  {
    noteId: 9,
    userNickname: 'SeongYong',
    title: 'GraphQL Introduction',
  },
  {
    noteId: 10,
    userNickname: 'SeongYong',
    title: 'Understanding TypeScript',
  },
  {
    noteId: 11,
    userNickname: 'SeongYong',
    title: 'Exploring React Hooks',
  },
  {
    noteId: 12,
    userNickname: 'SeongYong',
    title: 'Diving into Node.js',
  },
  {
    noteId: 13,
    userNickname: 'SeongYong',
    title: 'GraphQL Introduction',
  },
  {
    noteId: 14,
    userNickname: 'SeongYong',
    title: 'Understanding TypeScript',
  },
  {
    noteId: 15,
    userNickname: 'SeongYong',
    title: 'Exploring React Hooks',
  },
  {
    noteId: 16,
    userNickname: 'SeongYong',
    title: 'Diving into Node.js',
  },
  {
    noteId: 17,
    userNickname: 'SeongYong',
    title: 'GraphQL Introduction',
  },
];
