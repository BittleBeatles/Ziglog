import AWS from 'aws-sdk';
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});
const myBucket = new AWS.S3({
  params: { Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});
export const uploadImageFile = (image: any, setImage: any) => {
  const params = {
    ACL: 'public-read',
    Body: image,
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: process.env.NEXT_PUBLIC_AWS_FOLDER_NAME + '/' + image.name,
  };

  myBucket
    .putObject(params)
    .on('httpUploadProgress', (evt: any) => {
      setTimeout(() => {
        setImage(null);
      }, 3000);
    })
    .send((err) => {
      if (err) console.log('image upload error', err);
    });
};
