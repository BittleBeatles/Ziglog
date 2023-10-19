'use client';
import React, { ReactNode } from 'react';
import GoogleImage from '../../public/socialImg/web_light_sq_SI@3x.png';
import KaKaoImage from '../../public/socialImg/kakao_login_large_narrow.png';
import Image from 'next/image';

interface SocialLoginButtonProps {
  name: string;
  onClick: () => void;
}

export default function SocialLoginButton({
  name,
  onClick,
}: SocialLoginButtonProps) {
  const imageSrc = name === 'google' ? GoogleImage : KaKaoImage;
  const altText = name === 'google' ? 'Google 로그인' : '카카오 로그인';
  return (
    <div>
      <button onClick={onClick}>
        <Image src={imageSrc} alt={altText} />
      </button>
    </div>
  );
}
