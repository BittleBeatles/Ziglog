import { deleteNotification } from '@api/notification/notification';
import IconButton from '@components/common/IconButton';
import ProfileImage from '@components/common/ProfileImage';
import { useRouter } from 'next/navigation';
import { HTMLAttributes, useMemo, useState } from 'react';

interface SingleNotificationProps extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  id: string;
  senderNickname: string;
  senderProfileUrl: string;
  receiverNickname: string;
  noteId: number;
  title: string;
  isRead: boolean;
  type: string;
  dateTime: string | Date;
  handleNotificationRead: (notificationId: string) => void;
  handleFilterList: (id: string) => void;
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
  receiverNickname,
  handleNotificationRead,
  handleFilterList,
  ...rest
}: SingleNotificationProps) {
  const router = useRouter();
  const [isChecked, setIsClicked] = useState(isRead);
  const onClick = () => {
    router.push(
      `/user-page/${
        type === 'BOOKMARK' ? receiverNickname : senderNickname
      }/read-note/${noteId}`
    );
    setIsClicked(true);
    handleNotificationRead(id);
  };

  // 알림 삭제 함수
  const handleDeleteClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // 상위 이번트 막음
    event.stopPropagation();
    try {
      // 알림 삭제 API 호출
      await deleteNotification(id);

      // 상위 모달에서 list 업데이트 시킴
      handleFilterList(id);
      console.log('알림이 성공적으로 삭제되었습니다!');
    } catch (error) {
      console.error('알림 삭제 중 오류 발생:', error);
    }
  };

  const formattedDateTime = useMemo(() => {
    const koreanDate = new Date(dateTime);
    const formatTwoDigit = (value: number) => value.toString().padStart(2, '0');

    return `${koreanDate.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })}, ${formatTwoDigit(koreanDate.getHours())}:${formatTwoDigit(
      koreanDate.getMinutes()
    )}`;
  }, [dateTime]);
  return (
    <div key={noteId} onClick={onClick} className="cursor-pointer">
      <div
        {...rest}
        className={`shadow ${THEME_VARIANTS[theme]} ${
          !isChecked && HOVER_COLOR[theme]
        } w-108 px-4 h-20 rounded-md flex flex-row  place-content-between`}
      >
        <div className="flex flex-row">
          <div className="grid place-content-center">
            <ProfileImage size={55} src={senderProfileUrl} />
          </div>
          <div className="flex flex-row">
            <div
              className={`${isChecked ? 'bg-transparent' : 'bg-red-500'}
              w-2 h-2 rounded-full bg-red-transparent mt-3 mr-2`}
            ></div>
            <div className="grid place-content-center">
              <p className={`text-xs ${isChecked ? 'text-gray-500' : ''}`}>
                {formattedDateTime}
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
                    {'님이 나의 게시물을 참조했습니다.'}
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
        <div className="grid justify-end items-start mt-1 p-2">
          <IconButton
            onClick={handleDeleteClick}
            size={20}
            theme={theme}
            name="Close"
          />
        </div>
      </div>
    </div>
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
