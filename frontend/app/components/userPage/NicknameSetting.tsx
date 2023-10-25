import ProfileImage from '@components/common/ProfileImage';
import NicknameInput from '@components/common/NicknameInput';
import { InputHTMLAttributes, useRef } from 'react';
import ProfileChangeButton from '@components/common/ProfileChangeButton';
import Button from '@components/common/Button';

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
  return (
    <div
      className={`${THEME_VARIANTS[theme]} m-auto w-2/3 shadow-md border text-center rounded-md justify-center p-5`}
    >
      <p className="text-3xl">닉네임 설정</p>
      <div className="grid place-items-center">
        <div className="mt-5 flex flex-row">
          <div className="mr-16">
            <li>프로필 사진</li>
          </div>
          <div className="mt-1 pl-4 pr-20">
            <div className="relative w-24 h-28 mx-auto">
              <div className="absolute">
                <ProfileImage size={80} />
              </div>
              <div className="absolute right-0 bottom-0">
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
          <div className="mr-3">
            <li>닉네임</li>
          </div>
          <div className="mt-1">
            <NicknameInput theme={theme} nickname="사용자 닉네임" />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Button label="저장하기" color={'blue'} />
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: '',
  dark: 'bg-dark-background-page text-white',
};
