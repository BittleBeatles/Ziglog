import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import Image from 'next/image';
import GoogleLoginButtonLogo from '@public/images/GoogleLoginButtonLogo_small.png';
import KakaoLoginButtonLogo from '@public/images/KakaoLoginButtonLogo_small.png';

interface SocialLoginButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: 'google' | 'kakao';
}

export default function SocialLoginButton({
  name,
  ...rest
}: SocialLoginButtonProps) {
  const imageSrc =
    name === 'google' ? GoogleLoginButtonLogo : KakaoLoginButtonLogo;

  const altText = name === 'google' ? 'Google 로그인' : '카카오 로그인';
  return (
    <button className="w-fit">
      <Image
        src={imageSrc}
        width={150}
        height={50}
        alt={altText}
        priority={true}
      />
    </button>
  );
}
