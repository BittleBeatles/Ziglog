'use client';
import React from 'react';
import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import SocialLoginButton from '@components/common/SocialLoginButton';

interface SocialLoginBoxProps {
  theme: 'light' | 'dark';
}

export default function SocialLoginBox({ theme }: SocialLoginBoxProps) {
  return (
    <ModalLayout classname={`${THEME_VARIANTS[theme]} px-20`}>
      <div className="flex flex-col items-center justify-center my-4 gap-4">
        <Text type="b">{'소셜 계정으로 로그인 '}</Text>
        <SocialLoginButton name="google" />
        <SocialLoginButton name="kakao" />
      </div>
      <SocialLoginButton
        name="kakao"
        className="mt-4 drop-shadow grid place-items-center"
      />
    </ModalLayout>
  );
}
const THEME_VARIANTS = {
  light: 'bg-modal',
  dark: 'bg-dark-background-page text-white',
};
