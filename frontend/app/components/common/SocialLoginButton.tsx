import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import GoogleImage from '../../../public/images/GoogleLoginButtonLogo_small.png';
import KaKaoImage from '../../../public/images/KakaoLoginButtonLogo_small.png';
import Image from 'next/image';

interface SocialLoginButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  onClick: () => void;
}

export default function SocialLoginButton({
  name,
  onClick,
}: SocialLoginButtonProps) {
  const imageSrc = name === 'google' ? GoogleImage : KaKaoImage;
  const altText = name === 'google' ? 'Google 로그인' : '카카오 로그인';
  const imageWidth = 200;
  const imageHeight = 300;
  return (
    <button onClick={onClick}>
      <Image
        src={imageSrc}
        alt={altText}
        width={imageWidth}
        height={imageHeight}
      />
    </button>
  );
}
