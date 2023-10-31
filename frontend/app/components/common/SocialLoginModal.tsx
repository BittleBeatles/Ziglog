// 'use client';
import React from 'react';
import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import SocialLoginButton from '@components/common/SocialLoginButton';
import IconButton from '@components/common/IconButton';

interface SocialLoginModalProps {
  theme: 'light' | 'dark';
  openLoginModal: (open: boolean) => void;
}

export default function SocialLoginModal({
  theme,
  openLoginModal,
}: SocialLoginModalProps) {
  return (
    <ModalLayout classname={`${THEME_VARIANTS[theme]}`}>
      <div className="flex flex-col justify-center items-center mb-4">
        <div className="flex flex-row place-content-end w-full">
          <IconButton
            onClick={() => openLoginModal(false)}
            theme={theme}
            name="Close"
          />
        </div>
        <div className="px-16 gap-4 mb-4 flex flex-col justify-center items-center">
          <Text type="b">{'소셜 계정으로 로그인 '}</Text>
          <SocialLoginButton name="google" />
          <SocialLoginButton name="kakao" />
        </div>
      </div>
    </ModalLayout>
  );
}
const THEME_VARIANTS = {
  light: 'bg-modal',
  dark: 'bg-dark-background-page text-white',
};
