import Text from '@components/common/Text';
import Image, { StaticImageData } from 'next/image';
import Drawing from './Drawing';

interface DescriptionProps {
  pointer: StaticImageData;
  page: StaticImageData;
  title: string;
  content: string;
  drawLocation: string;
  direction: string;
}

export default function Description({
  title,
  content,
  pointer,
  page,
  drawLocation,
  direction,
}: DescriptionProps) {
  return (
    <div className="mt-20 flex justify-center mb-14">
      {direction === 'left' ? (
        <>
          <div className="flex flex-col justify-between w-1/4">
            <div>
              <Text type="h1">{title}</Text>
              <Text type="p" className="mt-4 mr-3 text-xl whitespace-pre-line">
                {content}
              </Text>
            </div>
            <div className="flex justify-center">
              <Image src={pointer} alt={'포인터'} width={300} height={385} />
            </div>
          </div>
          <div className="relative">
            <Image
              className="rounded-lg border border-solid shadow-xl"
              src={page}
              alt={'페이지'}
              width={0}
              height={0}
              style={{ width: 1034, height: 668 }}
            />
            <div className={`absolute z-10 ${drawLocation}`}>
              <Drawing classColor="text-main-100" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative">
            <Image
              className="rounded-lg border border-solid shadow-xl"
              src={page}
              alt={'페이지'}
              width={1067}
              height={690}
            />
            <div className={`absolute z-10 ${drawLocation}`}>
              <Drawing classColor="text-main-100" />
            </div>
          </div>
          <div className="flex flex-col justify-between w-1/4 ml-5">
            <div>
              <Text type="h1">{title}</Text>
              <Text type="p" className="mt-4 mr-3 text-xl whitespace-pre-line">
                {content}
              </Text>
            </div>
            <div className="flex justify-center">
              <Image src={pointer} alt={'포인터'} width={300} height={385} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
