import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import Image from 'next/image';
import GoogleLoginButtonLogo from '@public/images/GoogleLoginButtonLogo_small.png';
import KakaoLoginButtonLogo from '@public/images/KakaoLoginButtonLogo_small.png';
import { API_URL } from '@api/constants';
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
    <a className="w-fit" href={`${API_URL}//api/auth/oauth2/${name}`}>
      <Image
        src={imageSrc}
        width={150}
        height={50}
        alt={altText}
        priority={true}
      />
    </a>
  );
}
