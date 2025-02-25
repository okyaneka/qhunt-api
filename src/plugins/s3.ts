import { S3Helper } from "qhunt-lib";
import { S3Options } from "qhunt-lib/plugins/s3";
import { env } from "~/configs";

const options: S3Options = {
  bucket: env.AWS_BUCKET_NAME,
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
};

S3Helper.init(options);

export default S3Helper;
