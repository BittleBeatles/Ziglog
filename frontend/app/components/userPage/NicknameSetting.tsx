import ProfileImage from '@components/common/ProfileImage';
import NicknameInput from '@components/common/NicknameInput';
import { Dispatch, InputHTMLAttributes, SetStateAction, useRef } from 'react';
import ProfileChangeButton from '@components/common/ProfileChangeButton';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import IconButton from '@components/common/IconButton';
import { modifyUserInfo } from '@api/user/user';

interface NicknameSettingProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  openModal: (open: boolean) => void;
}

export default function NicknameSetting({
  theme = 'light',
  openModal,
}: NicknameSettingProps) {
  const imageRef = useRef<HTMLInputElement>(null);
  const handleProfileImageChangeClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  const handleImageInput = () => {
    console.log('[이미지 업로드 로직]');
  };
  const isPossible = true;
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
            <NicknameInput theme={theme} nickname="사용자 닉네임" />
            {isPossible === true ? (
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
