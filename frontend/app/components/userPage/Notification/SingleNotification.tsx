import { deleteNotification } from '@api/notification/notification';
import { NotificationList } from '@api/notification/types';
import { getMyInfo } from '@api/user/user';
import IconButton from '@components/common/IconButton';
import ProfileImage from '@components/common/ProfileImage';
import { setNotifications } from '@store/modules/userSlice';
import { RootState } from '@store/store';
import Link from 'next/link';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SingleNotificationProps extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  id: string;
  senderNickname: string;
  senderProfileUrl: string;
  noteId: number;
  title: string;
  isRead: boolean;
  type: string;
  dateTime: Date;
}

export default function SingleNotification({
  theme,
  id,
  isRead,
  type,
  title,
  senderNickname,
  senderProfileUrl,
  dateTime,
  noteId,
  ...rest
}: SingleNotificationProps) {
  // const [profileUrl, setProfileUrl] = useState('');
  // useEffect(() => {
  //   const getUserInformation = async () => {
  //     const result = await getUserInfo(senderNickname);
  //     if (result) {
  //       setProfileUrl(result.profileUrl);
  //     }
  //   };
  //   getUserInformation();
  // }, []);
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
  // RootState에서 알림 목록 가져오기
  const storedNotifications = useSelector(
    (state: RootState) => state.user.notifications.nontificationList
  );
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState<NotificationList>({
    nontificationList: [],
  });

  // 알림 삭제 함수
  const handleDeleteClick = async () => {
    try {
      // 알림 삭제 API 호출
      await deleteNotification(id);

      // 성공적으로 삭제된 알림을 UI에서 갱신
      setNotifications((prevNotifications) => ({
        nontificationList: prevNotifications.nontificationList.filter(
          (notification) => notification.id !== id
        ),
      }));
      // 성공적으로 삭제된 알림을 리덕스 스토어에서 갱신
      // dispatch(
      //   setNotifications({
      //     nontificationList: storedNotifications.filter(
      //       (notification) => notification.id !== id
      //     ),
      //   })
      // );

      console.log('알림이 성공적으로 삭제되었습니다!');
    } catch (error) {
      console.error('알림 삭제 중 오류 발생:', error);
    }
  };
  // storedNotifications가 변경될 때마다 업데이트
  useEffect(() => {
    setNotifications((prevState) => ({
      ...prevState,
      notificationList: storedNotifications,
    }));
  }, [storedNotifications]);

  return (
    <Link
      key={noteId}
      href={`/user-page/${
        type === 'bookmark' ? nickname : senderNickname
      }/read-note/${noteId}`}
      onClick={onClick}
    >
      <div
        {...rest}
        className={`shadow ${THEME_VARIANTS[theme]} ${
          !isChecked && HOVER_COLOR[theme]
        } w-120 px-4 h-20 rounded-md flex flex-row`}
      >
        <div className="absolute top-3 right-20 mt-2 mr-2">
          <IconButton onClick={handleDeleteClick} theme={theme} name="Close" />
        </div>
        <div className="grid place-content-center">
          {/* <Link href={`/user-page/${senderNickname}`}> */}
          <ProfileImage size={55} src={senderProfileUrl} />
          {/* </Link> */}
        </div>
        <div className="flex flex-row">
          <div
            className={`${isChecked ? 'bg-transparent' : 'bg-red-500'}
              w-2 h-2 rounded-full bg-red-transparent mt-3 mr-2`}
          ></div>
          <div className="grid place-content-center">
            <p className={`text-xs ${isChecked ? 'text-gray-500' : ''}`}>
              {dateTime instanceof Date
                ? dateTime.toLocaleString('ko-KR', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                  })
                : ''}
            </p>
            <div className="flex flex-row">
              <p
                className={`truncate max-w-xxs ${
                  isChecked ? 'text-gray-400' : ''
                }`}
              >
                {senderNickname}
              </p>
              {type === 'BOOKMARK' ? (
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
                {title}
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
