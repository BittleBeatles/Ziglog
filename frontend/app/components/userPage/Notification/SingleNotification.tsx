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
      key={targetNoteId}
      href={`/user-page/${
        type === 'bookmark' ? nickname : userNickname
      }/read-note/${targetNoteId}`}
      onClick={onClick}
    >
      <div
        className={`shadow ${THEME_VARIANTS[theme]} ${
          !isChecked && HOVER_COLOR[theme]
        } w-120 px-4 h-20 rounded-md flex flex-row`}
      >
        <div className="grid place-content-center">
          {/* <Link href={`/user-page/${userNickname}`}> */}
          <ProfileImage size={55} src={profileUrl} />
          {/* </Link> */}
        </div>
        <div className="flex flex-row">
          <div
            className={`${isChecked ? 'bg-transparent' : 'bg-red-500'}
              w-2 h-2 rounded-full bg-red-transparent mt-3 mr-2`}
          ></div>
          <div className="grid place-content-center">
            <p className={`text-xs ${isChecked ? 'text-gray-500' : ''}`}>
              {date.toLocaleString('ko-KR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
            <div className="flex flex-row">
              <p
                className={`truncate max-w-xxs ${
                  isChecked ? 'text-gray-400' : ''
                }`}
              >
                {userNickname}
              </p>
              {type === 'bookmark' ? (
                <p
                  className={`leading-4 py-1 ${
                    isChecked ? 'text-gray-400' : ''
                  }`}
                >
                  {'님이 나의 게시물을 북마크했습니다.'}
                </p>
              ) : (
                <p
                  className={`leading-4 py-1 ${
                    isChecked ? 'text-gray-400' : ''
                  }`}
                >
                  {'님이 나의 게시물을 인용했습니다.'}
                </p>
              )}
            </div>
            <div className="flex flex-row">
              <div
                className={`h-4 w-1 ${
                  isChecked ? 'bg-gray-400' : 'bg-blue-300'
                } mr-1`}
              ></div>
              <p
                className={`leading-4 font-normal  ${
                  isChecked ? 'text-gray-400' : ''
                }`}
              >
                {noteTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-charcol text-white ',
};

const HOVER_COLOR = {
  light: 'hover:bg-input-grey',
  dark: 'hover:bg-dark-background-page',
};
