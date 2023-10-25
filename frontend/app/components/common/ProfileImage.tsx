import Image, { StaticImageData } from 'next/image';
import DefaultProfileImg from '@public/images/DefaultProfileImg.jpg';

interface ProfileImageProps {
  size?: number;
  src?: string | StaticImageData;
  alt?: string;
}

export default function ProfileImage({
  size = 50,
  src = DefaultProfileImg,
  alt = 'profile image',
}: ProfileImageProps) {
  return (
    <div className="w-fit h-fit rounded-full overflow-hidden">
      <Image width={size} height={size} src={src} alt={alt} priority={true} />
    </div>
  );
}
