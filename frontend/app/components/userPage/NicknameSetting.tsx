import ProfileImage from '@components/common/ProfileImage';
import NicknameInput from '@components/common/NicknameInput';
import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import ProfileChangeButton from '@components/common/ProfileChangeButton';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import IconButton from '@components/common/IconButton';
import { getMyInfo, modifyUserInfo } from '@api/user/user';
import { checkNickname, getUserInfo } from '@api/user/user';

interface NicknameSettingProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  openModal: (open: boolean) => void;
}

export default function NicknameSetting({
  theme = 'light',
  openModal,
}: NicknameSettingProps) {
  // oldUserInfo: 변경 전 사용자의 정보
  const [oldUserInfo, setOldUserInfo] = useState({
    nickname: '닉네임',
    profileImage: '',
  });
  useEffect(() => {
    const getUserInfoEditPage = async () => {
      const result = await getMyInfo(); // 내 정보 받아오기 -> oldUserInfo에 저장
      if (result) {
        setOldUserInfo({
          nickname: result.nickname,
          profileImage: result.profileImage,
        });
      }
    };
    getUserInfoEditPage();
  }, []);

  // newNickname: 변경할 닉네임, default 값은 변경 전 닉네임
  const [newNickname, setValue] = useState(oldUserInfo.nickname);
  // 변화가 감지되었을 때 변화된 값을 newNickname에 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  let isPossible = false;
  // isPos: 닉네임 중복 검사 결과
  const [isPos, setNickname] = useState(false);
  // 닉네임 중복 검사
  const isChangeable = async (newNickname: string) => {
    // 닉네임 중복 검사 값을 isPossible에 저장
    const res = await checkNickname(newNickname);
    isPossible = res.isValid;
    setNickname(isPossible);
  };
  useEffect(() => {
    isChangeable(newNickname);
  }, [newNickname]);

  const imageRef = useRef<HTMLInputElement>(null);
  const handleProfileImageChangeClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  const handleImageInput = () => {
    console.log('[이미지 업로드 로직]');
  };
  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-132 shadow-md border text-center rounded-md justify-center p-5`}
    >
      <div className="flex justify-center relative">
        <Text type="h1">개인정보 수정</Text>

        <div className="absolute inset-y-0 right-0">
          <IconButton
            onClick={() => openModal(false)}
            theme={theme}
            name="Close"
          />
        </div>
      </div>

      <div className="grid place-items-center">
        <div className="mt-7 flex flex-row">
          <div className="mr-12 text-lg font-bold">
            <Text type="h4">프로필</Text>
          </div>
          <div className="mt-1 pr-28">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute">
                <ProfileImage size={100} />
              </div>
              <div className="absolute right-4 bottom-2 h-14">
                <ProfileChangeButton
                  theme={theme}
                  onClick={handleProfileImageChangeClick}
                  onInput={handleImageInput}
                  ref={imageRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid place-items-center">
        <div className="flex flex-row justify-center items-center">
          <div className="mr-12 mt-3 text-lg font-bold">
            <Text type="h4">닉네임</Text>
          </div>
          <div className="mt-4 flex flex-col">
            <NicknameInput
              theme={theme}
              nickname={oldUserInfo.nickname}
              onChange={handleChange}
            />
            {isPos ? (
              <Text className="mt-1 text-left text-xs text-green-600">
                사용 가능한 닉네임입니다
              </Text>
            ) : (
              <Text className="mt-1 text-left text-xs text-red-500">
                이미 존재하는 닉네임입니다
              </Text>
            )}
          </div>
        </div>
      </div>

      <div className="mt-7 mb-2">
        <Button
          onClick={() => {
            modifyUserInfo;
            openModal(false);
          }}
          label="저장하기"
          color="blue"
        />
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white',
  dark: 'bg-dark-background-page text-white',
};
