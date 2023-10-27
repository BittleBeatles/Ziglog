'use client';
import ModalLayout from '@components/common/ModalLayout';
import ProfileChangeButton from '@components/common/ProfileChangeButton';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { AppDispatch } from '@store/store';
import { useAppSelector } from '@store/store';
import SocialLoginBox from '@components/common/SocialLoginBox';
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
      <div className="flex justify-center h-screen">
        <SocialLoginBox theme="light" />
      </div>
    </div>
  );
}
