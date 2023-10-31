'use client';
import NavBar from '@components/common/NavBar';
import Text from '@components/common/Text';
import Image from 'next/image';
import Link from 'next/link';
import titleImg from '@public/images/main/titleImg.png';
import readNotePage from '@public/images/main/readNotePage.png';
import graphPage from '@public/images/main/graphPage.png';
import searchPage from '@public/images/main/searchPage.png';

import pointerGirl from '@public/images/main/pointerGirl.png';
import pointerBoy from '@public/images/main/pointerBoy.png';
import Description from '@components/main/Description';
import { useAppDispatch, useAppSelector } from '@store/store';

export default function Home() {
  const { theme, isLogin } = useAppSelector((state) => state.user);
  return (
    <div>
      <NavBar login={isLogin} />
      <div className={`px-16 py-4 ${THEME_VARIANTS[theme]}`}>
        <div className="text-center">
          <Text type="h1" className="text-7xl">
            내 지식, 문서, 프로젝트
          </Text>
          <div className="mt-10">
            <Text type="b" className="text-align text-lg">
              ZigLog는 지식 그래프로 효율적으로 문서들을 확인하는 <br />
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
          title="📈 그래프"
          content={
            '어떤 문서들이 위치해 있는지 탐색하기 어려웠죠?\nZiglog를 이용하면 I am 척척박사에요'
          }
          pointer={pointerGirl}
          page={graphPage}
          drawLocation={'top-1/4 left-2'}
        />

        <Description
          title="🔍 검색"
          content={
            '내 친구가 쓴 글을 보고싶다고요?\nZiglog를 이용하면 I am 척척박사'
          }
          pointer={pointerBoy}
          page={searchPage}
          drawLocation={'top-3/4 left-1/4'}
        />
      </div>
    </div>
  );
}
const THEME_VARIANTS = {
  light: '',
  dark: 'bg-dark-background-layout text-white',
};
