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
    <ModalLayout classname={`${THEME_VARIANTS[theme]}`}>
      <div className="flex flex-col justify-center items-center my-4 mx-14">
        <Text type="b">{'소셜 계정으로 로그인 '}</Text>
        <div className="flex flex-col gap-3 mt-3">
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
