import React from 'react';
import { ButtonHTMLAttributes } from 'react';
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
  const imageSrc = `${process.env.PUBLIC_URL}/images/${
    name === 'google'
      ? 'GoogleLoginButtonLogo_small.png'
      : 'KakaoLoginButtonLogo_small.png'
  }`;
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
