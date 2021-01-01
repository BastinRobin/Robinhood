import AWS from 'aws-sdk';
import { Request } from 'express';
import * as fs from 'fs';

import L from '../../common/logger';

interface MulterRequest extends Request {
  files: any;
}

export class UploadService {
  async upload(req: Request): Promise<any> {
    const BUCKET = process.env.AWS_S3_BUCKET;
    const REGION = process.env.AWS_REGION;
    const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
    const SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      region: REGION,
    });
    const documentFile = (req as MulterRequest).files.file;
    try {
      const s3 = new AWS.S3();
      const pars = {
        Bucket: BUCKET,
        Body: fs.readFileSync(documentFile.path),
        Key: documentFile.originalname,
        ContentType: documentFile.mimetype,
        ACL: 'public-read',
      };
      const s3Res = await s3.upload(pars).promise();
      return s3Res;
    } catch (error) {
      if (error) {
        L.error('Error ' + error);
        return error.message;
      }
    }
  }
}
export default new UploadService();
