import { InputHTMLAttributes, forwardRef } from 'react';
import SvgIcon from './SvgIcon';

interface ProfileChangeButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onClick: () => void;
  onInput: () => void;
  size?: number;
  theme: 'light' | 'dark';
}

const ProfileChangeButton = forwardRef<
  HTMLInputElement,
  ProfileChangeButtonProps
>(({ onClick, onInput, size = 24, theme }, ref) => {
  return (
    <div>
      <div
        className={`${THEME_VARIANTS[theme]} w-fit p-2 rounded-full`}
        onClick={onClick}
      >
        <SvgIcon
          name="Camera"
          size={size}
          color={theme == 'light' ? 'black' : 'white'}
        />
      </div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={ref}
        className="collapse w-1"
        onInput={onInput}
      />
    </div>
  );
});

const THEME_VARIANTS = {
  light: 'bg-input-grey',
  dark: 'bg-dark-background-layout',
};

export default ProfileChangeButton;
