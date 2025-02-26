import { awsS3, S3Options } from "qhunt-lib/plugins/aws-s3";
import { env } from "~/configs";

const options: S3Options = {
  bucket: env.AWS_BUCKET_NAME,
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
};

awsS3.init(options);

export default awsS3;
