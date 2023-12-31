import AWS from 'aws-sdk';
import { showAlert } from './alert';
import { Dispatch, SetStateAction } from 'react';
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});
const myBucket = new AWS.S3({
  params: { Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});
export const uploadImageFile = (
  selectFile: File,
  setProfileUrl: Dispatch<SetStateAction<string>>
) => {
  const params = {
    ACL: 'public-read',
    Body: selectFile,
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET || '',
    Key: process.env.NEXT_PUBLIC_AWS_FOLDER_NAME + '/' + selectFile.name,
  };

  myBucket.putObject(params).send((err) => {
    if (err) {
      showAlert('이미지 업로드에 실패했습니다', 'error');
    } else {
      const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3-${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${params.Key}`;
      setProfileUrl(imageUrl);
    }
  });
};
