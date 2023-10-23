import Image from 'next/image';

interface ProfileImageProps {
  size?: number;
  src?: string;
  alt?: string;
}

export default function ProfileImage({
  size = 50,
  src = 'https://i.pinimg.com/474x/34/6e/1d/346e1df0044fd77dfb6f65cc086b2d5e.jpg',
  alt = 'profile image',
}: ProfileImageProps) {
  return (
    <div className="absolute w-fit mx-auto rounded-full overflow-hidden">
      <Image width={size} height={size} src={src} alt={alt} />
    </div>
  );
}
