import { uploadFileToS3 } from '../repositories/s3.repository';

export const handleImageUpload = async (
  file: Express.Multer.File
): Promise<string> => {
  const url = await uploadFileToS3(file);
  return url;
};
