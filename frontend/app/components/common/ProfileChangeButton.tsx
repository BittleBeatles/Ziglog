import { InputHTMLAttributes, forwardRef } from 'react';
import SvgIcon from './SvgIcon';

interface ProfileChangeButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onClick: () => void;
  onInput: () => void;
}

const ProfileChangeButton = forwardRef<
  HTMLInputElement,
  ProfileChangeButtonProps
>(({ onClick, onInput }, ref) => {
  return (
    <div>
      <div className="bg-input-grey w-fit p-2 rounded-full" onClick={onClick}>
        <SvgIcon name="Camera" />
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
