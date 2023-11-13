import { useContext, useEffect, useRef, useState } from 'react';
import ProfileImage from '@components/common/ProfileImage';
import Text from '@components/common/Text';
import IconButton from '@components/common/IconButton';
import Button from '@components/common/Button';
import IconButtonWithBg from '@components/common/IconButtonWithBg';

import PersonalSearchInput from './SideBar/PersonalSearchInput';
import Directory from './SideBar/Directory';
import BookmarkList from './SideBar/BookmarkList';
import { useParams, useRouter } from 'next/navigation';
import ChangeUserInfoBox from './ChangeUserInfoBox';
import { Logout, getUserInfo } from '@api/user/user';
import { createNote } from '@api/note/note';
import { useAppDispatch, useAppSelector } from '@store/store';
import { setMyTheme } from '@store/modules/userSlice';
import { Note } from '@api/bookmark/types';
import SideDataContext from '@(pages)/user-page/[userNickname]/SideDataContext';
import SocialLoginModal from '@components/common/SocialLoginModal';
import NotificationModal from './Notification/NotificationModal';
import { showAlert } from '@src/util/alert';

interface SideBarProps {
  theme: 'light' | 'dark';
  sideBarToggle: () => void;
}

export default function SideBar({ theme, sideBarToggle }: SideBarProps) {
  const { isLogin, nickname, rootFolderId } = useAppSelector(
    (state) => state.user
  );
  //  모달
  const [loginModalOpen, setLoginModalOpne] = useState(false);
  const {
    getGraphData,
    getSideList,
    bookmarkList,
    getBookmarkList,
    getNoteGraphData,
  } = useContext(SideDataContext);

  // 주소 기반 닉네임 및 프로필 이미지
  const params = useParams();
  const paramsNickname = decodeURIComponent(params.userNickname as string);
  const [profileUrl, setProfileUrl] = useState('');
  const [isMine, setMine] = useState(nickname === paramsNickname);

  const router = useRouter();
  // 폴더 상태 => 전역으로 관리가 필요함
  const [parentId, setParentId] = useState<number>(rootFolderId);
  const [isModalOpen, setModalOpen] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [folderName, setFolderName] = useState('');

  //파일 추가 변수
  const [showInput, setShowInput] = useState<{
    show: boolean;
    type: 'note' | 'folder';
  }>({ show: false, type: 'note' });

  const dispatch = useAppDispatch();

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // 폴더 추가
  const addFolder = () => {
    setShowInput({ show: true, type: 'folder' });
  };

  // 세팅모달 열기
  const openModal = (open: boolean) => {
    setModalOpen(open);
  };

  // 알림 모달 열기
  const openNotification = (open: boolean) => {
    setNotificationModal(open);
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        showInput.type === 'folder' &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowInput((prevState) => ({ ...prevState, show: false }));
      }
    }
    // 클릭 이벤트를 document에 추가
    document.addEventListener('click', handleOutsideClick);
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showInput.type]);

  useEffect(() => {
    getBookmarkList();
  }, []);

  // 닉네임으로 개인정보를 조회
  useEffect(() => {
    const getProfileUrl = async () => {
      const res = await getUserInfo(paramsNickname);
      if (res) {
        setProfileUrl(res.profileUrl);
      }
    };
    getProfileUrl();
  }, [paramsNickname]);

  // 노트 추가
  const addNote = async () => {
    try {
      // 노트 생성 API 호출 및 결과 대기
      const result = await createNote(parentId);
      // 성공적으로 노트가 추가되면 sideList를 업데이트
      if (result === 200) {
        getSideList();
        getGraphData();
        getNoteGraphData();
      } else {
        showAlert('노트 추가에 실패했습니다', 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSideList();
  }, []);

  return (
    <div
      className="flex flex-col justify-between py-4 h-screen"
      ref={sidebarRef}
    >
      <div className="profile flex justify-between items-center px-8">
        <div>
          <ProfileImage src={profileUrl} />
        </div>
        <Text
          type="p"
          className={`${theme === 'dark' ? 'text-white' : ''} ml-2 text-sm`}
        >
          {paramsNickname}
        </Text>
        <IconButton
          onClick={sideBarToggle}
          theme={theme}
          name="DoubleArrowLeft"
        />
      </div>
      <div
        className={`control flex mt-5 px-8 ${
          isMine ? 'justify-between' : 'gap-2'
        }`}
      >
        <IconButtonWithBg
          onClick={() => router.push('/search')}
          size={30}
          theme={theme}
          name="GlobalSearch"
        />
        <IconButtonWithBg
          onClick={() => router.push(`/user-page/${paramsNickname}`)}
          size={30}
          theme={theme}
          name="GraphView"
        />
        {isMine && (
          <>
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
          </>
        )}
      </div>

      <div className="flex justify-center mt-5 px-8">
        <PersonalSearchInput
          theme={theme}
          placeholder="노트 검색"
          paramsNickname={paramsNickname}
        />
      </div>

      <div
        id="sidebar-scroll"
        className="h-full w-full overflow-y-auto scroll-bar px-2"
      >
        <div className="px-6">
          <div className="flex justify-start mt-5 mb-3">
            <Directory
              isMine={isMine}
              parentId={parentId}
              setParentId={setParentId}
              theme={theme}
              showInput={showInput}
              setShowInput={setShowInput}
              folderName={folderName}
              setFolderName={setFolderName}
            />
          </div>
          {isLogin && (
            <div>
              <hr />
              <div className="flex justify-start mt-5">
                <BookmarkList theme={theme} noteList={bookmarkList} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between px-8 mt-3">
        <IconButton
          onClick={() =>
            dispatch(setMyTheme(theme === 'light' ? 'dark' : 'light'))
          }
          theme={theme}
          name={theme === 'light' ? 'LightMode' : 'DarkMode'}
        />
        {!isLogin && (
          <Button
            onClick={() => setLoginModalOpne(true)}
            label="로그인"
            color="charcol"
          />
        )}

        {isLogin && isMine && (
          <Button onClick={() => Logout()} label="로그아웃" color="charcol" />
        )}
        {isLogin && !isMine && (
          <Button
            onClick={() => router.push(`/user-page/${nickname}`)}
            label="마이페이지"
            color="charcol"
          />
        )}
        {isLogin && isMine && (
          <IconButton
            onClick={() => openModal(true)}
            theme={theme}
            name="Setting"
          />
        )}
      </div>
      <div className="fixed bottom-8 right-8 z-20">
        <div className="flex items-center justify-center rounded-full bg-blue-400 p-2 h-10 w-10">
          <IconButton
            onClick={() => openNotification(true)}
            theme={theme}
            name="Notification"
          />
        </div>
      </div>
      {notificationModal && (
        <div className="fixed bottom-20 right-10 z-20">
          <NotificationModal
            theme={theme}
            openModal={openNotification}
          ></NotificationModal>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <ChangeUserInfoBox theme={theme} openModal={openModal} />
        </div>
      )}
      {loginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <SocialLoginModal theme={theme} openLoginModal={setLoginModalOpne} />
        </div>
      )}
    </div>
  );
}
