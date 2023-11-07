'use client';
import { useState, useEffect, ChangeEvent, useRef } from 'react';
import Text from '@components/common/Text';
import IconButton from '@components/common/IconButton';
import ProfileImage from '@components/common/ProfileImage';
import { getMyInfo } from '@api/user/user';
import ProfileChangeButton from '@components/common/ProfileChangeButton';
import { uploadImageFile } from '@src/util/uploadImageFile';
interface ChangeUserInfoProps {
  theme: 'light' | 'dark';
  // openModal: (open: boolean) => void;
}

export default function ChangeUserInfoBox({
  theme, // openModal,
}: ChangeUserInfoProps) {
  const imageRef = useRef<any>(null);
  const [image, setImage] = useState<any>('');
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    profileUrl: '',
  });
  const handleChange = async (e: ChangeEvent<HTMLInputElement>): void => {
    try {
      await uploadImageFile(image, setImage);
    } catch (error) {}
    // const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     setUserInfo({ ...userInfo, profileUrl: reader.result as string });
    //   };
    // }
  };
  useEffect(() => {
    const getUserInfoEditPage = async () => {
      const result = await getMyInfo();
      if (result) {
        setUserInfo({
          nickname: result.nickname,
          profileUrl: result.profileUrl,
        });
        setImage(result.profileUrl);
      }
    };
    getUserInfoEditPage();
  }, []);

  const handleClick = async () => {
    try {
      await uploadImageFile(image, setImage);
      alert('[succeeded uploading image to s3]');
    } catch (error) {
      alert('[failed to upload image to s3]');
    }
  };
  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-132 shadow-md border text-center rounded-md justify-center p-5`}
    >
      {/* 모달 제목 */}
      <div className="flex justify-center relative">
        <Text type="h1">개인정보 수정</Text>
        <div className="absolute inset-y-0 right-0">
          <IconButton
            // onClick={() => openModal(false)}
            theme={theme}
            name="Close"
          />
        </div>
      </div>
      {/* 프로필 */}
      <div className="flex flex-row gap-5">
        <Text type="h4">프로필</Text>
        <div className="relative">
          <ProfileImage src={userInfo.profileUrl} size={100} />
          <span className="absolute -bottom-2 ">
            <ProfileChangeButton
              theme="light"
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                uploadImageFile(e.target.files[0], setImage);
              }}
            />

            {/* <input type="file" accept="image/*" onChange={(e) => onUpload(e)} /> */}
          </span>
        </div>
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white',
  dark: 'bg-dark-background-page text-white',
};
