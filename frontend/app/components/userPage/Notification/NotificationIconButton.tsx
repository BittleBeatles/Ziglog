// 종 모양 아이콘 입니다.
import IconButton from '@components/common/IconButton';
import { ButtonHTMLAttributes } from 'react';

interface NotificationIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'dark' | 'light';
  showRedDot: boolean;
}

export default function NotificationIconButton({
  theme,
  showRedDot,
  ...rest
}: NotificationIconButtonProps) {
  return (
    <div className="flex items-center justify-center rounded-full bg-blue-400 p-2 h-10 w-10">
      {showRedDot ? (
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
      ) : null}
      <IconButton {...rest} theme={theme} name="Notification" />
    </div>
  );
}
