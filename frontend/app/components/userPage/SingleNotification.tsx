import { getUserInfo } from '@api/user/user';
import ProfileImage from '@components/common/ProfileImage';
import SvgIcon from '@components/common/SvgIcon';
import { HTMLAttributes, useEffect, useState } from 'react';

interface SingleNotificationProps extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  isChecked: boolean;
  type: 'bookmark' | 'quotation';
  title: string;
  nickname: string;
  date: Date;
}

export default function SingleNotification({
  theme,
  isChecked,
  type,
  title,
  nickname,
  date,
  ...rest
}: SingleNotificationProps) {
  const [profileUrl, setProfileUrl] = useState('');
  useEffect(() => {
    const getUserInfoEditPage = async () => {
      const result = await getUserInfo(nickname);
      if (result) {
        setProfileUrl(result.profileUrl);
      }
    };
    getUserInfoEditPage();
  }, []);
  return (
    <div
      className={`${THEME_VARIANTS[theme]} ${
        isChecked && HOVER_COLOR[theme]
      } w-120 px-4 h-20 rounded-md flex flex-row`}
    >
      <div className="grid place-content-center">
        <ProfileImage alt="img" size={55} src={profileUrl} />
      </div>
      {isChecked ? (
        <div className="flex flex-row">
          <div className="w-3 h-3 rounded-full bg-red-transparent mt-3 mr-2"></div>
          <div className="grid place-content-center">
            <p className="text-xs text-gray-500">
              {date.toLocaleString('ko-KR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
            <div className="flex flex-row">
              <p className="truncate max-w-xxs text-gray-500">{nickname}</p>
              {type == 'bookmark' ? (
                <p className="leading-4 py-1 text-gray-500">
                  {'님이 나의 게시물을 북마크했습니다.'}
                </p>
              ) : (
                <p className="leading-4 py-1 text-gray-500">
                  {'님이 나의 게시물을 인용했습니다.'}
                </p>
              )}
            </div>
            <p className="leading-4 font-normal underline-offset-2 text-gray-500">
              {title}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-row">
          <div className="w-3 h-3 rounded-full bg-red-500 mt-3 mr-2"></div>
          <div className="grid place-content-center">
            <p className="text-xs">
              {date.toLocaleString('ko-KR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
            <div className="flex flex-row">
              <p className="truncate max-w-xxs">{nickname}</p>
              {type == 'bookmark' ? (
                <p className="leading-4 py-1">
                  {'님이 나의 게시물을 북마크했습니다.'}
                </p>
              ) : (
                <p className="leading-4 py-1">
                  {'님이 나의 게시물을 인용했습니다.'}
                </p>
              )}
            </div>
            <p className="leading-4 font-normal underline-offset-2">{title}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-page text-white ',
};

const HOVER_COLOR = {
  light: 'hover:bg-input-grey',
  dark: 'hover:bg-dark-background-layout',
};
