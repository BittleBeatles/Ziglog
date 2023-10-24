import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import SocialLoginButton from './SocialLoginButton';

interface SocialLoginBoxProps {
  theme?: 'light' | 'dark';
}

export default function SocialLoginBox({ theme }: SocialLoginBoxProps) {
  return (
    <ModalLayout classname={theme}>
      {
        <div className="">
          <Text type="h2">{'소셜 계정으로 로그인 '}</Text>
          <SocialLoginButton name="google" />
          <SocialLoginButton name="kakao" />
        </div>
      }
    </ModalLayout>
  );
}
