import { useState, useEffect, ChangeEvent } from 'react';
import Text from '@components/common/Text';
import IconButton from '@components/common/IconButton';
import ProfileImage from '@components/common/ProfileImage';
import { getMyInfo, modifyUserInfo } from '@api/user/user';
import ProfileChangeButton from '@components/common/ProfileChangeButton';
import { uploadImageFile } from '@src/util/uploadImageFile';
import NicknameInput from '@components/common/NicknameInput';
import { checkNickname } from '@api/user/user';
import Button from '@components/common/Button';
import { useAppDispatch, useAppSelector } from '@store/store';
import { setMyInfo } from '@store/modules/userSlice';
interface ChangeUserInfoProps {
  theme: 'light' | 'dark';
  openModal: (open: boolean) => void;
}

export default function ChangeUserInfoBox({
  theme,
  openModal,
}: ChangeUserInfoProps) {
  const dispatch = useAppDispatch();
  const { rootFolderId } = useAppSelector((state) => state.user);
  const userNickname = useAppSelector((state) => state.user.nickname);
  const [profileUrl, setProfileUrl] = useState('');
  const [nickname, setNickname] = useState('');
  const [isUnique, setIsUnique] = useState(true);

  useEffect(() => {
    const getUserInfoEditPage = async () => {
      const result = await getMyInfo();
      if (result) {
        setProfileUrl(result.profileUrl);
        setNickname(result.nickname);
      }
    };
    getUserInfoEditPage();
  }, []);

  const handleClick = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const selectFile = e.target.files ? e.target.files[0] : null;
      uploadImageFile(selectFile, setProfileUrl);
    } catch (error) {}
  };

  const handleNicknameCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    if (userNickname !== e.target.value) {
      const res = await checkNickname(e.target.value);
      if (res.isValid) {
        setIsUnique(true);
        setNickname(e.target.value);
      } else {
        setIsUnique(false);
      }
    }
  };

  const handleSubmit = () => {
    modifyUserInfo(nickname, profileUrl);
    openModal(false);
    dispatch(
      setMyInfo({
        nickname: nickname,
        profileUrl: profileUrl,
        rootFolderId: rootFolderId,
      })
    );
    window.location.replace(`/user-page/${nickname}`);
  };

  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-132 shadow-md border text-center rounded-md justify-center p-5`}
    >
      {/* 모달 제목 */}
      <div className="flex justify-center relative">
        <Text type="h1">개인정보 수정</Text>
        <div className="absolute inset-y-0 right-0">
          <IconButton
            // onClick={() => openModal(false)}
            theme={theme}
            name="Close"
          />
        </div>
      </div>
      {/* 프로필 & 닉네임 */}
      <div className="flex flex-col gap-5 my-5 ml-20">
        {/* 프로필 */}
        <div className="flex flex-row gap-16 ">
          <Text type="h4">프로필</Text>
          <div className="relative">
            <ProfileImage src={profileUrl} size={100} />
            <span className="absolute -bottom-2 -right-5">
              <ProfileChangeButton theme="light" onChange={handleClick} />
            </span>
          </div>
        </div>
        {/* 닉네임 수정 */}
        <div className="flex flex-row gap-5 ">
          <Text type="h4">닉네임</Text>
          <div className="flex flex-col items-start gap-1">
            <NicknameInput
              theme={theme}
              nickname={nickname}
              onChange={handleNicknameCheck}
            />
            {!isUnique ? (
              <Text className="text-xs text-red-500">
                사용 불가능한 닉네임입니다.
              </Text>
            ) : (
              <Text className="text-xs text-green-600">
                사용 가능한 닉네임입니다.
              </Text>
            )}
          </div>
        </div>
      </div>
      {/* 제출하기 */}
      <Button
        onClick={handleSubmit}
        disabled={isUnique ? false : true}
        label="저장하기"
        color="blue"
      />
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white',
  dark: 'bg-dark-background-page text-white',
};
