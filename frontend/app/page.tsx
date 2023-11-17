'use client';
import NavBar from '@components/common/NavBar';
import Text from '@components/common/Text';
import Image from 'next/image';
import titleImg from '@public/images/main/titleImg.png';
import pointerLeftGirl from '@public/images/main/pointerLeftGirl.webp';
import pointerGirl from '@public/images/main/pointerGirl.webp';
import pointerBoy from '@public/images/main/pointerBoy.webp';
import Description from '@components/main/Description';
import readNoteLight from '@public/images/main/read-note-light.webp';
import readNoteDark from '@public/images/main/read-note-dark.webp';
import noteGraphLight from '@public/images/main/note-graph-light.webp';
import noteGraphDark from '@public/images/main/note-graph-dark.webp';
import folderGraphLight from '@public/images/main/folder-graph-light.webp';
import folderGraphDark from '@public/images/main/folder-graph-dark.webp';
import searchLight from '@public/images/main/search_light.webp';
import searchDark from '@public/images/main/search_dark.webp';
import { useAppSelector } from '@store/store';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme, isLogin } = useAppSelector((state) => state.user);
  const textList = ['지식을', '문서를', '프로젝트를'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(true);
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textList.length);
        setFade(true);
      }, 1000);
    }, 2500); // 시간초 조절

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div>
      <NavBar theme={theme} isLogin={isLogin} />
      <div className={`px-16 py-4 ${THEME_VARIANTS[theme]}`}>
        <div className="text-center">
          <Text type="h1" className="text-7xl">
            쉽고 재미있는
          </Text>
          <Text
            type="h1"
            className={`text-7xl ${fade ? 'fade-in' : 'fade-out'}`}
            key={currentIndex}
          >
            {textList[currentIndex]}
          </Text>
          <Text type="h1" className="text-7xl">
            위한 공간
          </Text>
          <div className="mt-10">
            <Text type="b" className="text-align text-lg">
              ZigLog는 지식 그래프로 효율적으로 문서를 탐색하는
              <br />
              📘 워크 스페이스입니다
            </Text>
          </div>
        </div>
        <div className="flex flex-col items-center mt-10">
          <Image
            priority
            src={titleImg}
            alt={'타이틀이미지'}
            width={682}
            height={366}
          />
          <Image
            priority
            className="rounded-lg border border-solid shadow-xl"
            src={theme === 'light' ? readNoteLight : readNoteDark}
            alt={'글읽기 페이지'}
            width={1067}
            height={690}
          />
        </div>
        <div className="text-center mt-20">
          <Text type="h1" className="text-5xl">
            모든 작업들을 한눈에 확인할 수 있어요
          </Text>
        </div>
        <Description
          title="📈 그래프 : 노트 관계"
          content={
            '노트 그래프를 통해 노트들 간 관계를 한 눈에 파악할 수 있어요.\n\n글 작성 시, 다른 노트를 참조하면 그래프에서 두 노트가 간선으로 연결됩니다.'
          }
          pointer={pointerGirl}
          page={theme === 'light' ? noteGraphLight : noteGraphDark}
          drawLocation={'top-1/4 left-2'}
          direction="left"
        />
        <Description
          title="📈 그래프 : 폴더 구조"
          content={
            '폴더 그래프를 통해 내 폴더와 노트 구조를 한 눈에 파악할 수 있어요.\n\n 중첩되고 복잡한 폴더 구조를 2d, 3d 그래프로 관리해보세요. '
          }
          pointer={pointerLeftGirl}
          page={theme === 'light' ? folderGraphLight : folderGraphDark}
          drawLocation={'top-1/4 left-2'}
          direction="right"
        />
        <Description
          title="🔍 검색"
          content={
            '다른 사용자들의 글을 검색할 수 있어요.\n\n글 검색을 통해 다른 사람들의 그래프를 구경하고 마음에 드는 글을 북마크 해보세요.'
          }
          pointer={pointerBoy}
          page={theme === 'light' ? searchLight : searchDark}
          drawLocation={'top-1/4 left-1/5'}
          direction="left"
        />
      </div>
    </div>
  );
}
const THEME_VARIANTS = {
  light: '',
  dark: 'bg-dark-background-layout text-white',
};
