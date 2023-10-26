import { InputHTMLAttributes, forwardRef } from 'react';
import SvgIcon from './SvgIcon';

interface ProfileChangeButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onClick: () => void;
  onInput: () => void;
  size?: number;
}

const ProfileChangeButton = forwardRef<
  HTMLInputElement,
  ProfileChangeButtonProps
>(({ onClick, onInput, size = 24 }, ref) => {
  return (
    <div>
      <div className="bg-input-grey w-fit p-2 rounded-full" onClick={onClick}>
        <SvgIcon name="Camera" size={size} />
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

export default ProfileChangeButton;
