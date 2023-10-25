'use client';
import ModalLayout from '@components/common/ModalLayout';
import ProfileChangeButton from '@components/common/ProfileChangeButton';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { AppDispatch } from '@store/store';
import { useAppSelector } from '@store/store';
export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.userReducer.nickname);
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
