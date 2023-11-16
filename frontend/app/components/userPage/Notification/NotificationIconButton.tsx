// 종 모양 아이콘 입니다.
import IconButton from '@components/common/IconButton';
import { ButtonHTMLAttributes } from 'react';

interface NotificationIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'dark' | 'light';
}

export default function NotificationIconButton({
  theme,
  ...rest
}: NotificationIconButtonProps) {
  return (
    <div className="flex items-center justify-center rounded-full bg-blue-400 p-2 h-10 w-10">
      <IconButton {...rest} theme={theme} name="Notification" />
    </div>
  );
}
