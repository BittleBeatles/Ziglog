import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import GoogleLoginButtonLogo from '@public/images/GoogleLoginButtonLogo_small.png';
import KakaoLoginButtonLogo from '@public/images/KakaoLoginButtonLogo_small.png';
import { API_URL } from '@api/constants';
import Image from 'next/image';
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
    <a className="w-fit" href={`${API_URL}/auth/oauth2/authorization/${name}`}>
      <Image
        className=" opacity-100 hover:opacity-60 transition-opacity duration-300"
        src={imageSrc}
        width={0}
        height={0}
        alt={altText}
        priority={true}
        style={{ width: 200, height: 50 }}
      />
    </a>
  );
}
