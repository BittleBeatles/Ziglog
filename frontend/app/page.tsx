import NavBar from '@components/common/NavBar';
import SocialLoginButton from '@components/common/SocialLoginButton';
import Text from '@components/common/Text';
import Image from 'next/image';
import Link from 'next/link';
import titleImg from '@public/images/main/titleImg.png';
import readNotePage from '@public/images/main/readNotePage.png';
import graphPage from '@public/images/main/graphPage.png';
import pointerGirl from '@public/images/main/pointerGirl.png';
import pointerBoy from '@public/images/main/pointerBoy.png';

export default function Home() {
  return (
    <div>
      <NavBar login={true} />
      {/* <SocialLoginButton name="kakao" />
      <h1 className="underline decoration-sky-500">지그재그 프로젝트입니다.</h1>
      <div>
        <Link href={'/user-page/성용/edit-note/1'}>글 수정 페이지가기</Link>
      </div>
      <div>
        <Link href={'/user-page/성용/read-note/1'}>글 읽기 페이지가기</Link>
      </div> */}
      <div className="px-16 py-4">
        <div className="text-center">
          <Text type="h1" className="text-7xl">
            내 지식, 문서, 프로젝트
          </Text>
          <div className="mt-10">
            <Text type="b" className="text-align text-lg">
              ZigLog는 지식 그래프로 효율적으로 문서들을 확인하는 <br />
              📘워크 스페이스입니다.
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
            모든 작업들을 한눈에 확인
          </Text>
        </div>

        <div className="mt-20 flex justify-end">
          <div className="flex flex-col justify-between">
            <div>
              <Text type="h1">📈그래프</Text>
              <Text type="p" className="mt-5 text-xl">
                어떤 문서들이 위치해 있는지 탐색하기 어려웠죠? <br />
                Ziglog를 이용하면 I am 척척박사
              </Text>
            </div>
            <div className="flex justify-end">
              <Image
                src={pointerGirl}
                alt={'그래프포인터'}
                width={300}
                height={385}
              />
            </div>
          </div>
          <div>
            <Image
              className="rounded-lg border border-solid shadow-xl"
              src={graphPage}
              alt={'그래프 페이지'}
              width={1067}
              height={690}
            />
          </div>
        </div>

        <div className="mt-20 flex justify-end mb-14">
          <div className="flex flex-col justify-between">
            <div>
              <Text type="h1">📈그래프</Text>
              <Text type="p" className="mt-5 text-xl">
                어떤 문서들이 위치해 있는지 탐색하기 어려웠죠? <br />
                Ziglog를 이용하면 I am 척척박사
              </Text>
            </div>
            <div className="flex justify-end">
              <Image src={pointerBoy} alt={'포인터'} width={300} height={385} />
            </div>
          </div>
          <div>
            <Image
              className="rounded-lg border border-solid shadow-xl"
              src={graphPage}
              alt={'그래프 페이지'}
              width={1067}
              height={690}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
