import { getMyInfo, getUserInfo } from '@api/user/user';
import ProfileImage from '@components/common/ProfileImage';
import Link from 'next/link';
import { HTMLAttributes, useEffect, useState } from 'react';

interface SingleNotificationProps extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  isRead: boolean;
  type: 'bookmark' | 'quotation';
  noteTitle: string;
  userNickname: string;
  date: Date;
  targetNoteId: number;
}

export default function SingleNotification({
  theme,
  isRead,
  type,
  noteTitle,
  userNickname,
  date,
  targetNoteId,
}: SingleNotificationProps) {
  const [profileUrl, setProfileUrl] = useState('');
  useEffect(() => {
    const getUserInformation = async () => {
      const result = await getUserInfo(userNickname);
      if (result) {
        setProfileUrl(result.profileUrl);
      }
    };
    getUserInformation();
  }, []);
  const [isChecked, setIsClicked] = useState(isRead);
  const onClick = () => {
    setIsClicked(true);
  };
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    const getMyInformation = async () => {
      const result = await getMyInfo();
      if (result) {
        setNickname(result.nickname);
      }
    };
    getMyInformation();
  });
  return (
    <Link
      href={`/user-page/${nickname}/read-note/${targetNoteId}`}
      onClick={onClick}
    >
      <div
        className={`${THEME_VARIANTS[theme]} ${
          !isChecked && HOVER_COLOR[theme]
        } w-120 px-4 h-20 rounded-md flex flex-row`}
      >
        <div className="grid place-content-center">
          <Link href={`/user-page/${userNickname}`}>
            <ProfileImage alt="img" size={55} src={profileUrl} />
          </Link>
        </div>
        {isChecked ? (
          <div className="flex flex-row">
            <div className="w-2 h-2 rounded-full bg-red-transparent mt-3 mr-2"></div>
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
                <p className="truncate max-w-xxs text-gray-500">
                  {userNickname}
                </p>
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
              <div className="flex flex-row">
                <div className="h-4 w-1 bg-gray-500 mr-1"></div>
                <p className="leading-4 font-normal text-gray-500">
                  {noteTitle}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-3 mr-2"></div>
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
                <p className="truncate max-w-xxs">{userNickname}</p>
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
              <div className="flex flex-row">
                <div className="h-4 w-1 bg-blue-300 mr-1"></div>
                <p className="leading-4 font-normal">{noteTitle}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
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
