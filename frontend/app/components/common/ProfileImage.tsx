import Image, { StaticImageData } from 'next/image';
import DefaultProfileImg from '@public/images/DefaultProfileImg.jpg';

interface ProfileImageProps {
  size?: number;
  src?: string | StaticImageData;
}

export default function ProfileImage({
  size = 50,
  src = DefaultProfileImg,
}: ProfileImageProps) {
  const imageSrc = src === '' ? DefaultProfileImg : src;
  return (
    <div
      className={`rounded-full overflow-hidden bg-cover bg-center bg-no-repeat`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${imageSrc})`,
      }}
    />
  );
}
