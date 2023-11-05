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
  const imageSrc = src === '' ? DefaultProfileImg : src;
  return (
    <div className="rounded-full overflow-hidden">
      <Image
        width={size}
        height={size}
        src={imageSrc}
        alt={alt}
        priority={true}
      />
    </div>
  );
}
