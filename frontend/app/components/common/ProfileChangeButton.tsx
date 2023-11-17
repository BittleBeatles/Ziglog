import { InputHTMLAttributes, forwardRef } from 'react';
import SvgIcon from './SvgIcon';

interface ProfileChangeButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  theme: 'light' | 'dark';
  size?: number;
}

const ProfileChangeButton = forwardRef<
  HTMLInputElement,
  ProfileChangeButtonProps
>(({ size = 24, theme, ...rest }, ref) => {
  return (
    <div>
      <div
        className={`${THEME_VARIANTS[theme]} w-fit m-2 rounded-full`}
        aria-disabled={true}
      >
        <div className="w-10 h-10 rounded-full"></div>
      </div>
      <div>
        <input
          {...rest}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          ref={ref}
          className="w-10 h-10 bg-transparent text-transparent absolute bottom-2 right-2
          file:border-0 file:w-10 file:h-10 file:rounded-full z-40
          file:bg-transparent file:text-transparent"
        />
        <div className="absolute right-4 bottom-4">
          <SvgIcon
            name="Camera"
            size={size}
            color={theme == 'light' ? 'black' : 'white'}
          />
        </div>
      </div>
    </div>
  );
});

const THEME_VARIANTS = {
  light: 'bg-input-grey',
  dark: 'bg-dark-background-layout',
};

export default ProfileChangeButton;
