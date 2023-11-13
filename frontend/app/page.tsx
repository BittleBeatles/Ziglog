'use client';
import NavBar from '@components/common/NavBar';
import Text from '@components/common/Text';
import Image from 'next/image';
import titleImg from '@public/images/main/titleImg.png';
import readNotePage from '@public/images/main/readNotePage.png';
import graphPage from '@public/images/main/graphPage.png';
import searchPage from '@public/images/main/searchPage.png';
import pointerLeftGirl from '@public/images/main/pointerLeftGirl.png';
import pointerGirl from '@public/images/main/pointerGirl.png';
import pointerBoy from '@public/images/main/pointerBoy.png';
import Description from '@components/main/Description';
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
          <Image src={titleImg} alt={'타이틀이미지'} width={682} height={366} />
          <Image
            className="rounded-lg border border-solid shadow-xl"
            src={readNotePage}
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
            '노트 그래프 뷰에서 노트들 간 관계를 한 눈에 파악할 수 있어요.\n\n글 작성 시, 다른 노트를 참조하면 그래프에서 두 노트가 간선으로 연결됩니다.'
          }
          pointer={pointerGirl}
          page={graphPage}
          drawLocation={'top-1/4 left-2'}
          direction="left"
        />
        <Description
          title="📈 그래프 : 폴더 구조"
          content={
            '폴더 그래프 뷰에서 내 폴더와 노트 구조를 한 눈에 파악할 수 있어요.\n\n 중첩되고 복잡한 폴더 구조를 2d, 3d 그래프로 관리해보세요. '
          }
          pointer={pointerLeftGirl}
          page={graphPage}
          drawLocation={'top-1/4 left-2'}
          direction="right"
        />
        <Description
          title="🔍 검색"
          content={
            '다른 사용자들의 글을 검색할 수 있어요.\n\n글 검색을 통해 다른 사람들의 그래프를 구경하고 마음에 드는 글을 북마크 해보세요.'
          }
          pointer={pointerBoy}
          page={searchPage}
          drawLocation={'top-3/4 left-1/4'}
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
