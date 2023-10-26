import ProfileImage from '@components/common/ProfileImage';
import NicknameInput from '@components/common/NicknameInput';
import { InputHTMLAttributes, useRef } from 'react';
import ProfileChangeButton from '@components/common/ProfileChangeButton';
import Button from '@components/common/Button';
import Text from '@components/common/Text';

interface NicknameSettingProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
}

export default function NicknameSetting({
  theme = 'light',
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
      className={`${THEME_VARIANTS[theme]} m-auto w-132 shadow-md border text-center rounded-md justify-center p-5`}
    >
      <Text type="h2">{'개인정보 수정'}</Text>
      <div className="grid place-items-center">
        <div className="mt-7 flex flex-row">
          <div className="mr-12 text-lg font-bold">
            <li>프로필</li>
          </div>
          <div className="mt-1 pr-28">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute">
                <ProfileImage size={100} />
              </div>
              <div className="absolute right-4 bottom-2 h-14">
                <ProfileChangeButton
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
            <li>닉네임</li>
          </div>
          <div className="mt-4 flex flex-col">
            <NicknameInput theme={theme} nickname="사용자 닉네임" />
            {isPossible == true ? (
              <p className="text-left text-xs text-green-600">
                사용 가능한 닉네임입니다
              </p>
            ) : (
              <p className="text-left text-xs text-red-500">
                이미 존재하는 닉네임입니다
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-7">
        <Button label="저장하기" color={'blue'} />
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: '',
  dark: 'bg-dark-background-page text-white',
};
