import AWS from 'aws-sdk';
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});
const myBucket = new AWS.S3({
  params: { Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});
export const uploadImageFile = (image: any, setProfileUrl: any) => {
  const params = {
    ACL: 'public-read',
    Body: image,
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: process.env.NEXT_PUBLIC_AWS_FOLDER_NAME + '/' + image.name,
  };

  myBucket.putObject(params).send((err) => {
    if (err) {
      console.log('image upload error', err);
    } else {
      const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3-${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${params.Key}`;
      setProfileUrl(imageUrl);
    }
  });
};
