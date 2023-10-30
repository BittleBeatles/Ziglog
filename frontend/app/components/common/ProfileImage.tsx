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
    <div className="rounded-full overflow-hidden">
      <Image
        width={0}
        height={0}
        src={src}
        alt={alt}
        priority={true}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
