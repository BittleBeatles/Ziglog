'use client';
import ModalLayout from '@components/common/ModalLayout';
import ProfileChangeButton from '@components/common/ProfileChangeButton';

import { useRef } from 'react';

export default function Main() {
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
    <div>
      <h1>메인페이지입니다.</h1>
      <ModalLayout>모달 예시입니다.</ModalLayout>
      <ProfileChangeButton
        onClick={handleProfileImageChangeClick}
        onInput={handleImageInput}
        ref={imageRef}
      />
    </div>
  );
}
