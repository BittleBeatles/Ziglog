import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import SocialLoginButton from './SocialLoginButton';

interface SocialLoginBoxProps {
  theme?: 'light' | 'dark';
}

export default function SocialLoginBox({ theme }: SocialLoginBoxProps) {
  return (
    <ModalLayout classname="px-24">
      {
        <div className="flex flex-col items-center justify-center my-4">
          <Text type="b">{'소셜 계정으로 로그인 '}</Text>
          <div className="mt-4 flex flex-col items-center">
            <SocialLoginButton name="google" className="mt-2 drop-shadow" />
            <SocialLoginButton name="kakao" className="mt-5 drop-shadow" />
          </div>
        </div>
      }
    </ModalLayout>
  );
}
